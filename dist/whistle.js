!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react"),require("react-dom")):"function"==typeof define&&define.amd?define(["react","react-dom"],e):"object"==typeof exports?exports.Whistle=e(require("react"),require("react-dom")):t.Whistle=e(t.React,t.ReactDOM)}(this,function(t,e){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.setWrapDisplayName=e.FetchShape=e.Fetch=e.ValidationShape=e.Validation=e.Whistle=void 0;var o=n(7),i=r(o),a=n(5),u=r(a),c=n(6),s=r(c),f=n(3),l=r(f),p=n(4),d=r(p),h=n(2),v=r(h);e.Whistle=i.default,e.Validation=u.default,e.ValidationShape=s.default,e.Fetch=l.default,e.FetchShape=d.default,e.setWrapDisplayName=v.default,e.default=i.default},function(e,n){e.exports=t},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){}e.__esModule=!0,e.default=o;var i=n(9);r(i)},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},c=n(1),s=r(c),f=n(2),l=r(f),p=function(t){var e=t.fetch,n=t.success,r=t.error;return{isFetching:!!e,isSuccess:!!n,isError:!!r,fetch:e,success:n,error:r}},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.propName,n=void 0===e?"fetch":e,r=t.mapper,f=void 0===r?p:r,d=t.initialState,h=void 0===d?{}:d;return function(t){var e=function(e){function r(t){o(this,r);var n=i(this,e.call(this,t));return n.state={fetch:h.fetch||"",success:h.success||"",error:h.error||""},n.start=n.start.bind(n),n.ok=n.ok.bind(n),n.fail=n.fail.bind(n),n}return a(r,e),r.prototype.start=function(t){this.setState({fetch:t,success:"",error:""})},r.prototype.ok=function(t){this.setState({success:t,fetch:"",error:""})},r.prototype.fail=function(t){this.setState({error:t,fetch:"",success:""})},r.prototype.render=function(){var e,r=u({},f(this.state),{start:this.start,ok:this.ok,fail:this.fail}),o=u({},this.props,(e={},e[n]=r,e));return s.default.createElement(t,o)},r}(c.Component);return(0,l.default)("Fetch",e),e}};e.default=d},function(t,e,n){"use strict";e.__esModule=!0;var r=n(1),o=r.PropTypes.bool,i=r.PropTypes.func,a=r.PropTypes.string,u=shape({isFetching:o,isSuccess:o,isError:o,fetch:a,success:a,error:a,start:i,ok:i,fail:i});e.default=u},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0;var u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s=n(1),f=r(s),l=n(8),p=r(l),d=n(2),h=r(d),v=function(t){return t&&(0,p.default)(t.then)},y=function(){return!1},b=function(t){var e=t.propName,n=void 0===e?"validation":e,r=t.fields,l=void 0===r?[]:r,d=t.ruleMap,b=void 0===d?{}:d;return function(t){var e=function(e){function r(t){o(this,r);var a=i(this,e.call(this,t));return a.fields=l,a.ruleMap=b,a.propName=n,a.state=a.initState(),a.validate=a.validate.bind(a),a.singleValidate=a.singleValidate.bind(a),a.validateFields=a.validateFields.bind(a),a.handleMessage=a.handleMessage.bind(a),a.validation={singleValidate:a.singleValidate,validate:a.validate,validateFields:a.validateFields,handleMessage:a.handleMessage},a}return a(r,e),r.prototype.initState=function(){return this.fields.reduce(function(t,e){return t[e]="",t},{})},r.prototype.handleMessage=function(t){var e=this;return function(){var n,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";(0,p.default)(r)&&r(e.contextChild,e.validation)||r;e.setState((n={},n[t]=r,n))}},r.prototype.singleValidate=function(t){var e=this,n=this.handleMessage(t);return function(r){return function(o){try{if(v(o))return o.then(function(n){if(!e.state[t])return e.singleValidate(t)(r)(n)});if("function"==typeof o)return e.singleValidate(t)(r)(o(r,e.contextChild,e.validation));if("object"===("undefined"==typeof o?"undefined":c(o))){var i=o.validator,a=void 0===i?y:i,u=o.msg,s=void 0===u?"":u,f=a(r,e.contextChild,e.validation);return!!f||(n(s),!1)}throw new Error("rule参数错误")}catch(t){}return!0}}},r.prototype.validate=function(t){var e=this;return function(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.ruleMap[t];if(!r)return!0;for(var o=r.slice(0);o.length;){var i=o.shift(),a=e.singleValidate(t)(n)(i);if("boolean"==typeof a&&!a)return a}return e.handleMessage(t)(),!0}},r.prototype.validateFields=function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=Object.keys(t);return n?r.reduce(function(n,r){return e.validate(r)(t[r])||(n=!1),n},!0):r.every(function(n){return e.validate(n)(t[n])})},r.prototype.render=function(){var e,n=this,r=u({},this.props,(e={},e[this.propName]=u({field:this.state},this.validation),e));return f.default.createElement(t,u({ref:function(t){return n.contextChild=t}},r))},r}(s.Component);return(0,h.default)("Validation",e),e}};e.default=b},function(t,e,n){"use strict";e.__esModule=!0;var r=n(1),o=r.PropTypes.func,i=r.PropTypes.objectOf,a=r.PropTypes.shape,u=r.PropTypes.string,c=a({field:i(u),singleValidate:o,validate:o,validateFields:o});e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){var e=void 0,n=void 0,r=new Promise(function(t,r){e=t,n=r}),u=function(r){function u(){return o(this,u),i(this,r.apply(this,arguments))}return a(u,r),u.prototype.render=function(){return f.default.createElement(t,c({},this.props,{onResolve:e,onReject:n}))},u}(s.Component);(0,d.default)("Whistle",u);var p=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=document.body.appendChild(document.createElement("div")),n=((0,l.render)(f.default.createElement(u,t),e),function(){(0,l.unmountComponentAtNode)(e),setTimeout(function(){document.body.removeChild(e)},0)});return r.then(function(t){n()}).catch(function(t){n()}),r};return p.then=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return r=r.then.apply(r,e),p},p.catch=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];return r=r.catch.apply(r,e),p},p.resolve=e,p.reject=n,p}e.__esModule=!0;var c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.default=u;var s=n(1),f=r(s),l=n(10),p=n(2),d=r(p)},function(t,e){function n(t){var e=r(t)?u.call(t):"";return e==o||e==i}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}var o="[object Function]",i="[object GeneratorFunction]",a=Object.prototype,u=a.toString;t.exports=n},function(t,e){"use strict";e.__esModule=!0;var n=function(t){if("string"==typeof t)return t;if(t)return t.displayName||t.name||"Component"};e.default=n},function(t,n){t.exports=e}])});