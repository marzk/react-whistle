# react-whistle

A react-component to handle your upset ui state.

## Install

```javascript
npm install --save react-whistle
```

## Usage

```jsx
const Dialog = Whistle(props => (
  <div>
    <button onClick={props.onResolve}>Confirm</button>
    <button onClick={props.onReject}>Cancel</button>
  </div>
));

Dialog();
```

You dont need to handle states about a dialog's show and hide, you just need call `props.onResolve` or `props.onReject`.

```jsx
Dialog.then(() => alert('confirm')).catch(() => alert('cancel'))();
```

Callbacks for your Whistle Component before destroy.


```jsx
Dialog().then(() => alert('confirm after destory'))
```

Callbacks for your Whistle Component after confirm destroy.(cancel is still in thinking.)

## Last

Be happy with react-whistle.

_I just hating handle dialog components in every component!_

# React-Validation

## Introduction

验证这件事，无关视觉只与数据与动作有关。数据即验证规则与提示信息，动作即触发验证。实现的方式为高阶组件HOC，传递一个prop(默认为validation，可修正)于相关组件。

## Usage

```javascript

class FormContainer extends Component {
  // ...
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleNameChange(e) {
    const value = e.target.value;
    this.props.validation.validate('name');
    return value;
  }

  render() {
    const { validation: field } = this.props;
    return (
      <form>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
        />
        {field.name ?
          <span>{field.name}</span>
          : null
        }
      </form>
    );
  }
}

Validation({
  propName: 'validation', // 传递的prop
  fields: ['name'], // 涉及到的rule
  // 规则
  ruleMap: {
    name: {
      validator: name => typeof name === 'string' && name.length,
      msg: '姓名不能为空',
    },
  },
})(FormContainer)


```

### 同步验证

#### Simple

```javascript
ruleMap = {
  name: {
    validator: name => typeof name === 'string' && name.length,
    msg: '姓名不能为空',
  },
};
```

#### Advance

```javascript
ruleMap = {
  name: {
    validator: (name, context) => typeof name === 'string' && name.length,
    msg: context => '姓名不能为空',
  },
};
```

### 联动验证

### 异步验证

### 联合验证

## Glossary

### ruleMap

```javascript
{
  ruleMap: objectOf(oneOfType([
    shape({
      validator: func,
      msg: oneOfType([string, func]),
    }),
    instanceOf(Promise),
    func,
  ])),
}
```

#### validator

#### msg

### validate

### field

### validateFields

## Design

### Rule



#### Object

```javascript
{
  validator,
  msg,
}
```

#### Function

#### Promise
