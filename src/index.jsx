import React, { Component, PropTypes } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export default function Whistle(Wrapper) {
  let onResolve, onReject;
  const promise = new Promise((resolve, reject) => {
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
  Container.displayName = `Whistle(${WrapperName})`;

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
    return promise.then(value => {
      destroy();
      return value;
    }, reason => {
      destroy();
    });
  };

  whistle.promise = promise;

  return whistle;
}

