import React, { Component, PropTypers } from 'react';
import {
  Validation,
  ValidationShape,
} from '../../dist/whistle';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    // 触发验证
    this.props.validation.validate('name')(value);
    this.setState({
      name: value,
    });
    return value;
  }

  render() {
    // field访问验证信息
    const { validation: { field } } = this.props;
    return (
      <div>
        <div>
          <p>Name字段的两条规则：</p>
          <ul>
            <li>非空</li>
            <li>只能数字与字母</li>
          </ul>
          <label htmlFor="name">Name: </label> 
          <input
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {field.name ?
            <p style={{ color: 'red' }}>{field.name}</p>
            : null
          }
        </div>
      </div>
    );
  }
};

Form.propTypes = {
  validation: ValidationShape,
};

const FormContainer = Validation({
  fields: ['name'],
  ruleMap: {
    name: [
      {
        validator: v => v.length,
        msg: 'name不能为空',
      },
      {
        validator: v => /^[\w\d]+$/.test(v),
        msg: 'name只能由数字与字母组成',
      },
      (value, context, validation) => {
        return async function () {
          validation.handleMessage('name')('isFetching...');
          const result = await new Promise(resolve => {
            setTimeout(() => {
              resolve(value !== '666');
            }, 1000);
          });
          return {
            validator: () => result,
            msg: '用户名重复',
          };
        };
      }
    ],
  },
})(Form);

export default FormContainer;

