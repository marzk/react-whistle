import { PropTypes } from 'react';

const {
  bool, func, string,
} = PropTypes;

const propTypes = shape({
  isFetching: bool,
  isSuccess: bool,
  isError: bool,
  fetch: string,
  success: string,
  error: string,
  start: func,
  ok: func,
  fail: func,
});

export default propTypes;
