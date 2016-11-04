import React, { Component } from 'react';
import isFunction from 'lodash.isfunction';

//import setWrapDisplayName from 'components/HOC/setWrapDisplayName';

const isPromise = p => p && typeof p.then === 'function';
const alwaysFalse = () => false;

const ValidationHOC = ({
  propName = 'validation',
  fields = [],
  ruleMap = {},
}) => Wrapper => {
  class Validation extends Component {
    constructor(props) {
      super(props);
      this.fields = fields;
      this.ruleMap = ruleMap;
      this.propName = propName;
      this.state = this.initState();
      this.validate = this.validate.bind(this);
      this.singleValidate = this.singleValidate.bind(this);
      this.validateFields = this.validateFields.bind(this);
    }

    initState() {
      return {
        ...this.fields.reduce((state, field) => {
          state[field] = '';
          return state;
        }, {}),
      };
    }

    singleValidate(field) {
      return value => rule => {
        try {
          if (isPromise(rule)) {
            return rule.then(this.singleValidate(field)(value));
          } else if (typeof rule === 'function') {
            return rule(value, this.validate);
          } else if (typeof rule === 'object') {
            const {
              validator = alwaysFalse,
              msg = '',
            } = rule;

            let v = value;
            if (typeof value === 'object') {
              v = value[field] || '';
            }

            const isValid = validator(v);

            if (!isValid) {
              this.setState({
                [field]: isFunction(msg) ? msg() : msg,
              });
              return false;
            }

            return true;
          }

          throw new Error('rule参数错误');
        } catch (e) {
          // do nothing
        }
        return true;
      };
    }

    validate(field) {
      return (value, originRules = this.ruleMap[field]) => {
        // 若无相应验证规则则验证通过，不做处理
        if (!originRules) {
          return true;
        }

        // 进行验证，不通过则停止验证并取验证信息
        // rule仅支持Object形式，且包括validator与msg
        const rules = originRules.slice(0);
        while (rules.length) {
          const rule = rules.shift();

          const result = this.singleValidate(field)(value)(rule);

          if (typeof result === 'boolean') {
            if (!result) {
              return result;
            }
          } else if (!isPromise(result)) {
            rules.unshift(result);
          }
        }

        this.setState({
          [field]: '',
        });

        return true;
      };
    }

    validateFields(fields) {
      return Object.keys(fields).every(field => this.validate(field)(fields));
    }

    render() {
      const validation = {
        field: this.state,
        singleValidate: this.singleValidate,
        validate: this.validate,
        validateFields: this.validateFields,
      };

      const newProps = {
        ...this.props,
        [this.propName]: validation,
      };
      return (
        <Wrapper {...newProps} />
      );
    }
  }

  //return setWrapDisplayName('Validation')(Validation);
  return Validation;
};

export default ValidationHOC;

