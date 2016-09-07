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
