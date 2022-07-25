"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
var _lodash = /*#__PURE__*/ _interopRequireDefault(require("lodash"));
var _localforage = /*#__PURE__*/ _interopRequireDefault(require("localforage"));
var _actionTypes = /*#__PURE__*/ _interopRequireWildcard(require("./action_types"));
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
var defaultClient = _localforage.default.createInstance({
    name: "local",
    storeName: "cache"
});
var _default = function() {
    var client = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultClient;
    return function(store) {
        return function(next) {
            return function(action) {
                var ref = _slicedToArray(action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/), 3), namespace = ref[1], type = ref[2];
                var cid = action.cid ? {
                    cid: action.cid
                } : {};
                switch(type){
                    case _actionTypes.LOCAL_SET:
                        coerceArray(action.request).map(function(requestAction) {
                            store.dispatch(_objectSpreadProps(_objectSpread({
                                type: withNamespace(namespace, requestAction)
                            }, action.meta, cid), {
                                key: action.key,
                                value: action.value
                            }));
                        });
                        return client.setItem(action.key, action.value, function(err, value) {
                            if (err) {
                                coerceArray(action.failure).map(function(failureAction) {
                                    store.dispatch(_objectSpreadProps(_objectSpread({
                                        type: withNamespace(namespace, failureAction)
                                    }, action.meta, cid), {
                                        err: err
                                    }));
                                });
                                if (action.onFailure) action.onFailure(err);
                            } else {
                                coerceArray(action.success).map(function(successAction) {
                                    store.dispatch(_objectSpreadProps(_objectSpread({
                                        type: withNamespace(namespace, successAction)
                                    }, action.meta, cid), {
                                        value: value
                                    }));
                                });
                                if (action.onSuccess) action.onSuccess(value);
                            }
                        });
                    case _actionTypes.LOCAL_GET:
                        coerceArray(action.request).map(function(requestAction) {
                            store.dispatch(_objectSpreadProps(_objectSpread({
                                type: withNamespace(namespace, requestAction)
                            }, action.meta, cid), {
                                key: action.key
                            }));
                        });
                        return client.getItem(action.key, function(err, value) {
                            if (err) {
                                coerceArray(action.failure).map(function(failureAction) {
                                    store.dispatch(_objectSpreadProps(_objectSpread({
                                        type: withNamespace(namespace, failureAction)
                                    }, action.meta, cid), {
                                        err: err
                                    }));
                                });
                                if (action.onFailure) action.onFailure(result);
                            } else {
                                coerceArray(action.success).map(function(successAction) {
                                    store.dispatch(_objectSpreadProps(_objectSpread({
                                        type: withNamespace(namespace, successAction)
                                    }, action.meta, cid), {
                                        value: value
                                    }));
                                });
                                if (action.onSuccess) action.onSuccess(value);
                            }
                        });
                    case _actionTypes.LOCAL_REMOVE:
                        coerceArray(action.request).map(function(requestAction) {
                            store.dispatch(_objectSpreadProps(_objectSpread({
                                type: withNamespace(namespace, requestAction)
                            }, action.meta, cid), {
                                key: action.key
                            }));
                        });
                        return client.removeItem(action.key, function(err, value) {
                            if (err) {
                                coerceArray(action.failure).map(function(failureAction) {
                                    store.dispatch(_objectSpreadProps(_objectSpread({
                                        type: withNamespace(namespace, failureAction)
                                    }, action.meta, cid), {
                                        err: err
                                    }));
                                });
                                if (action.onFailure) action.onFailure(err);
                            } else {
                                coerceArray(action.success).map(function(successAction) {
                                    store.dispatch(_objectSpread({
                                        type: withNamespace(namespace, successAction)
                                    }, action.meta, cid));
                                });
                                if (action.onSuccess) action.onSuccess(value);
                            }
                        });
                    default:
                        return next(action);
                }
            };
        };
    };
};
var coerceArray = function(value) {
    return value ? !_lodash.default.isArray(value) ? [
        value
    ] : value : [];
};
var withNamespace = function(namespace, type) {
    return namespace ? "".concat(namespace, "/").concat(type) : type;
};
