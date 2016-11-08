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
      password: '',
      confirmPassword: '',
    };
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
      v => {
        this.props.validation.validate(field)(v);
        return v;
      },
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
          <p>密码与确认密码的规则：</p>
          <ul>
            <li>密码、确认密码非空</li>
            <li>密码、确认密码只能只能数字与字母</li>
            <li>密码：确认密码非空时，密码与确认密码不一致，在确认密码处显示不一致</li>
            <li>确认密码：密码非空时，输入确认密码判断与密码是否一致</li>
          </ul>
          {['password', 'confirmPassword'].map(this.renderPasswordField.bind(this))}
        </div>
      </div>
    );
  }
};

Form.propTypes = {
  validation: ValidationShape,
};

const isPasswordSame = {
};

const FormContainer = Validation({
  fields: ['password', 'confirmPassword'],
  ruleMap: {
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
        // 两种方式
        // 第一种直接控制confirmPassword的消息显示
        // if (isSame) {
        //   validation.handleMessage('confirmPassword')();
        // } else {
        //   validation.handleMessage('confirmPassword')('密码不一致');
        // }
        // 第二种触发一次confirmPassword的验证流程
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

