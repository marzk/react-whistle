import { PropTypes } from 'react';

const {
  func,
  objectOf,
  shape,
  string,
} = PropTypes;

const propTypes = shape({
  field: objectOf(string),
  singleValidate: func,
  validate: func,
  validateFields: func,
});

export default propTypes;
