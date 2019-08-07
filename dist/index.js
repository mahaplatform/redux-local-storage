'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _action_types = require('./action_types');

var actionTypes = _interopRequireWildcard(_action_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultClient = _localforage2.default.createInstance({
  name: 'local',
  storeName: 'cache'
});

exports.default = function () {
  var client = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultClient;


  return function (store) {
    return function (next) {
      return function (action) {
        var _action$type$match = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/),
            _action$type$match2 = _slicedToArray(_action$type$match, 3),
            namespace = _action$type$match2[1],
            type = _action$type$match2[2];

        var cid = action.cid ? { cid: action.cid } : {};

        switch (type) {

          case actionTypes.LOCAL_SET:

            coerceArray(action.request).map(function (requestAction) {
              store.dispatch(_extends({
                type: withNamespace(namespace, requestAction)
              }, action.meta, cid, {
                key: action.key,
                value: action.value
              }));
            });

            return client.setItem(action.key, action.value, function (err, value) {

              if (err) {
                coerceArray(action.failure).map(function (failureAction) {
                  store.dispatch(_extends({
                    type: withNamespace(namespace, failureAction)
                  }, action.meta, cid, {
                    err: err
                  }));
                });
              }

              coerceArray(action.success).map(function (successAction) {
                store.dispatch(_extends({
                  type: withNamespace(namespace, successAction)
                }, action.meta, cid, {
                  value: value
                }));
              });
            });

          case actionTypes.LOCAL_GET:

            coerceArray(action.request).map(function (requestAction) {
              store.dispatch(_extends({
                type: withNamespace(namespace, requestAction)
              }, action.meta, cid, {
                key: action.key
              }));
            });

            return client.getItem(action.key, function (err, value) {

              if (err) {
                coerceArray(action.failure).map(function (failureAction) {
                  store.dispatch(_extends({
                    type: withNamespace(namespace, failureAction)
                  }, action.meta, cid, {
                    err: err
                  }));
                });
              }

              coerceArray(action.success).map(function (successAction) {
                store.dispatch(_extends({
                  type: withNamespace(namespace, successAction)
                }, action.meta, cid, {
                  value: value
                }));
              });
            });

          case actionTypes.LOCAL_REMOVE:

            coerceArray(action.request).map(function (requestAction) {
              store.dispatch(_extends({
                type: withNamespace(namespace, requestAction)
              }, action.meta, cid, {
                key: action.key
              }));
            });

            return client.removeItem(action.key, function (err, value) {

              if (err) {
                coerceArray(action.failure).map(function (failureAction) {
                  store.dispatch(_extends({
                    type: withNamespace(namespace, failureAction)
                  }, action.meta, cid, {
                    err: err
                  }));
                });
              }

              coerceArray(action.success).map(function (successAction) {
                store.dispatch(_extends({
                  type: withNamespace(namespace, successAction)
                }, action.meta, cid));
              });
            });

          default:

            return next(action);

        }
      };
    };
  };
};

var coerceArray = function coerceArray(value) {
  return value ? !_lodash2.default.isArray(value) ? [value] : value : [];
};

var withNamespace = function withNamespace(namespace, type) {
  return namespace ? namespace + '/' + type : type;
};