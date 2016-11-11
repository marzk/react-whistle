import React, { Component } from 'react';
import setWrapDisplayName from './setWrapDisplayName';

const defaultMapper = ({
  fetch, success, error,
}) => ({
  isFetching: !!fetch,
  isSuccess: !!success,
  isError: !!error,
  fetch,
  success,
  error,
});

const FetchHOC = ({
  propName = 'fetch',
  mapper = defaultMapper,
  initialState = {},
} = {}) => Wrapper => {
  class Fetch extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fetch: initialState.fetch || '',
        success: initialState.success || '',
        error: initialState.error || '',
      };
      this.start = this.start.bind(this);
      this.ok = this.ok.bind(this);
      this.fail = this.fail.bind(this);
    }

    start(fetch) {
      this.setState({
        fetch,
        success: '',
        error: '',
      });
    }

    ok(success) {
      this.setState({
        success,
        fetch: '',
        error: '',
      });
    }

    fail(error) {
      this.setState({
        error,
        fetch: '',
        success: '',
      });
    }

    render() {
      const mapProps = {
        ...mapper(this.state),
        start: this.start,
        ok: this.ok,
        fail: this.fail,
      };
      const props = {
        ...this.props,
        [propName]: mapProps,
      };
      return (
        <Wrapper {...props} />
      );
    }
  }

  setWrapDisplayName('Fetch', Fetch);

  return Fetch;
};

export default FetchHOC;

