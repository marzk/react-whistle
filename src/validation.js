import React, { Component } from 'react';

import setWrapDisplayName from './setWrapDisplayName';

const isPromise = p => p && isFunction(p.then);
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
      this.handleMessage = this.handleMessage.bind(this);
      this.validation = {
        singleValidate: this.singleValidate,
        validate: this.validate,
        validateFields: this.validateFields,
        handleMessage: this.handleMessage,
      };
    }

    initState() {
      return this.fields.reduce((state, field) => {
        state[field] = '';
        return state;
      }, {});
    }

    handleMessage(field) {
      return (msg = '') => {
        const message =
          (isFunction(msg) && msg(this.contextChild, this.validation)) || msg;
        this.setState({
          [field]: message,
        });
      };
    }

    singleValidate(field) {
      const handleMessage = this.handleMessage(field);
      return value => rule => {
        try {
          if (isPromise(rule)) {
            return rule.then(rule => {
              if (!this.state[field]) {
                return this.singleValidate(field)(value)(rule);
              }
            });
          } else if (typeof rule === 'function') {
            return this.singleValidate(field)(value)(
              rule(value, this.contextChild, this.validation)
            );
          } else if (typeof rule === 'object') {
            const { validator = alwaysFalse, msg = '' } = rule;

            const isValid = validator(
              value,
              this.contextChild,
              this.validation
            );

            if (!isValid) {
              handleMessage(msg);
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
          }
        }

        this.handleMessage(field)();

        return true;
      };
    }

    validateFields(fields, { always = false, type = 'bool' } = {}) {
      const arrFields = Object.keys(fields);
      if (always) {
        return arrFields.reduce((result, field) => {
          if (!this.validate(field)(fields[field])) {
            result = false;
          }
          return result;
        }, true);
      } else {
        return arrFields.every(field => this.validate(field)(fields[field]));
      }
    }

    render() {
      const newProps = {
        ...this.props,
        [this.propName]: {
          field: this.state,
          ...this.validation,
        },
      };
      return (
        <Wrapper ref={child => (this.contextChild = child)} {...newProps} />
      );
    }
  }

  setWrapDisplayName('Validation', Validation);
  return Validation;
};

export default ValidationHOC;

function isFunction(func) {
  return typeof func === 'function';
}
