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
        <Wrapper onResolve={onResolve} onReject={onReject} {...this.props} />
      );
    }
  }

  setWrapDisplayName('Whistle', Container);

  let wrapper = document.body.appendChild(document.createElement('div'));

  // Always, and dont block reject.
  promise.then(destroy, destroy);

  whistle.update = update;
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

  function whistle(props = {}) {
    const component = update(props);
    return promise;
  }

  function update(props = {}) {
    props = typeof props === 'function' ? props(onResolve, onReject) : props;

    return render(<Container {...props} />, wrapper);
  }

  function destroy() {
    unmountComponentAtNode(wrapper);
    setTimeout(() => {
      document.body.removeChild(wrapper);
      wrapper = null;
    }, 0);
  }
}
