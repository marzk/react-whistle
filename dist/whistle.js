'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = Whistle;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function Whistle(Wrapper) {
  var onResolve = undefined,
      onReject = undefined;
  var promise = new Promise(function (resolve, reject) {
    onResolve = resolve;
    onReject = reject;
  });

  var Container = (function (_Component) {
    _inherits(Container, _Component);

    function Container() {
      _classCallCheck(this, Container);

      _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Container, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.resolve = onResolve;
        this.reject = onReject;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(Wrapper, { onResolve: this.resolve, onReject: this.reject });
      }
    }]);

    return Container;
  })(_react.Component);

  var wrapperName = Wrapper && Wrapper.displayName || Wrapper.name || typeof Wrapper === 'string' && Wrapper || 'Component';
  Container.displayName = 'Whistle(' + wrapperName + ')';

  var whistle = function whistle() {
    var wrapper = document.body.appendChild(document.createElement('div'));
    var component = (0, _reactDom.render)(_react2['default'].createElement(Container, null), wrapper);
    var destroy = function destroy() {
      (0, _reactDom.unmountComponentAtNode)(wrapper);
      setTimeout(function () {
        document.body.removeChild(wrapper);
      }, 0);
    };

    // Always, and dont block reject.
    promise = promise.then(function (value) {
      destroy();
      return value;
    })['catch'](function (reason) {
      destroy();
    });

    return promise;
  };

  whistle.then = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    promise = promise.then.apply(promise, args);
    return whistle;
  };
  whistle['catch'] = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    promise = promise['catch'].apply(promise, args);
    return whistle;
  };

  return whistle;
}

module.exports = exports['default'];