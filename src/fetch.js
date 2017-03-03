import React, { Component } from 'react';
import setWrapDisplayName from './setWrapDisplayName';

const defaultMapper = ({
  fetch, success, error, isFetching, isSuccess, isError,
}) => ({
  isFetching,
  isSuccess,
  isError,
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
        isFetching: !!initialState.fetch,
        isError: !!initialState.error,
        isSuccess: !!initialState.success,
      };
      this.start = this.start.bind(this);
      this.ok = this.ok.bind(this);
      this.fail = this.fail.bind(this);
    }

    start(fetch) {
      this.setState({
        fetch,
        isFetching: true,
        isError: true,
        isSuccess: false,
        success: '',
        error: '',
      });
    }

    ok(success) {
      this.setState({
        success,
        isSuccess: true,
        isError: true,
        isFetching: false,
        fetch: '',
        error: '',
      });
    }

    fail(error) {
      this.setState({
        error,
        isError: true,
        isFetching: false,
        isSuccess: false,
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

  setWrapDisplayName('Fetch')(Fetch);

  return Fetch;
};

export default FetchHOC;
