import React, { Component, PropTypers } from 'react';
import {
  Validation,
  ValidationShape,
} from '../../dist/whistle';
import compose from 'recompose/compose';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      confirmPassword: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, password, confirmPassword } = this.state;
    const result = this.props.validation.validateFields({
      name, password, confirmPassword,
    }, true);
    alert(result);
  }

  handleState(field) {
    return value => {
      this.setState({
        [field]: value,
      });
      return value;
    };
  }

  handleField(field) {
    return compose(
      this.handleState(field),
      e => e.target.value
    );
  }

  renderPasswordField(field) {
    return (
      <div key={field}>
        <label htmlFor={field}>{`${field.charAt(0).toUpperCase()}${field.slice(1)}`}: </label> 
        <input
          id={field}
          name={field}
          type="password"
          value={this.state[field]}
          onChange={this.handleField(field)}
        />
        <p style={{ color: 'red' }}>{this.props.validation.field[field]}</p>
      </div>
    );
  }

  render() {
    // field访问验证信息
    const { validation: { field } } = this.props;
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleField('name')}
              />
              <p style={{ color: 'red' }}>{this.props.validation.field.name}</p>
            </div>
            {['password', 'confirmPassword'].map(this.renderPasswordField.bind(this))}
            <button type="submit">提交</button>
          </form>
        </div>
      </div>
    );
  }
};

Form.propTypes = {
  validation: ValidationShape,
};

const FormContainer = Validation({
  fields: ['name', 'password', 'confirmPassword'],
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
    ],
    password: [
      {
        validator: v => v.length,
        msg: 'password不能为空',
      },
      {
        validator: v => /^[\w\d]+$/.test(v),
        msg: 'password只能由数字与字母组成',
      },
      (password, context, validation) => {
        const { confirmPassword } = context.state;
        const isSame = !password.length || !confirmPassword.length || password === confirmPassword;
        validation.validate('confirmPassword')(confirmPassword, [
          {
            validator: () => isSame,
            msg: '密码不一致',
          },
        ]); 
        
      },
    ],
    confirmPassword: [
      {
        validator: v => v.length,
        msg: 'confirmPassword不能为空',
      },
      {
        validator(v, context) {
          const { password } = context.state;
          return !v.length || !password.length || v === password;
        },
        msg: '密码不一致',
      }
    ],
  },
})(Form);

export default FormContainer;
