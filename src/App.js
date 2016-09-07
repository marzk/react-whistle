import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Whistle from './whistle';

const Dialog = props => {
  return (
    <div style={{position: 'fixed', background: 'white', width: '200px', height: '200px', left: '50%', top: '50%', marginLeft: '-100px', marginTop: '-100px', lineHeight: '200px', textAlign: 'center', border: '1px solid black'}}>
      Hello World!
      <button onClick={props.onResolve}>Ok</button>
      <button onClick={props.onReject}>Cancel</button>
    </div>
  );
};

class App extends Component {
  openDialog() {
    return Whistle(Dialog).then(_ => alert('成功')).catch(_ => {
      console.log('catch', _);
      alert('失败');
    })();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          
        </p>
          <button onClick={this.openDialog}>open</button>
      </div>
    );
  }
}

export default App;
