import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import setWrapDisplayName from './setWrapDisplayName';

export default function Whistle(Wrapper) {
  let onResolve, onReject;
  let promise = new Promise((resolve, reject) => {
    onResolve = resolve;
    onReject = reject;
  });

  class Container extends Component {
    render() {
      return (
        <Wrapper {...this.props} onResolve={onResolve} onReject={onReject} />
      );
    }
  }

  setWrapDisplayName('Whistle', Container);

  const whistle = (props = {}) => {
    const wrapper = document.body.appendChild(document.createElement('div'));
    const component = render(<Container {...props} />, wrapper);
    const destroy = () => {
      unmountComponentAtNode(wrapper);
      setTimeout(() => {
        document.body.removeChild(wrapper);
      }, 0);
    };

    // Always, and dont block reject.
    promise.then(value => {
      destroy();
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

  whistle.resolve = onResolve;
  whistle.reject = onReject;

  return whistle;
}

