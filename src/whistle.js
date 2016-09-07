import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export default function Whistle(Wrapper) {
  let onResolve, onReject;
  let promise = new Promise((resolve, reject) => {
    onResolve = resolve;
    onReject = reject;
  });

  class Container extends Component {
    componentWillMount() {
      this.resolve = onResolve;
      this.reject = onReject;
    }

    render() {
      return (
        <Wrapper onResolve={this.resolve} onReject={this.reject} />
      );
    }
  }

  const wrapperName = Wrapper && Wrapper.displayName || Wrapper.name || typeof Wrapper === 'string' && Wrapper || 'Component';
  Container.displayName = `Whistle(${wrapperName})`;

  const whistle = () => {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const component = render(<Container />, wrapper);
    const destroy = () => {
      unmountComponentAtNode(wrapper);
      setTimeout(() => {
        document.body.removeChild(wrapper);
      }, 0);
    };

    // Always, and dont block reject.
    promise = promise.then(value => {
      destroy();
      return value;
    }).catch(reason => {
      destroy();
    });

    return promise;
  };

  whistle.then = (...args) => {
    promise = promise.then.apply(promise, args);
    return whistle;
  };
  whistle.catch = (...args) => {
    promise = promise.catch.apply(promise, args);
    return whistle;
  };

  return whistle;
}

