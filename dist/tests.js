"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _chai = require("chai");
var _index = /*#__PURE__*/ _interopRequireDefault(require("./index"));
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
var mockLocalStorage = {
    setItem: function(key, value, cb) {
        var err = key === "err" ? "err" : null;
        cb(err, value);
    },
    getItem: function(key, cb) {
        var err = key === "err" ? "err" : null;
        cb(err, "bar");
    },
    removeItem: function(key, cb) {
        var err = key === "err" ? "err" : null;
        cb(err);
    }
};
var middleware = (0, _index.default)(mockLocalStorage);
describe("local middleware", function() {
    it("allows non local actions to pass through", function(done) {
        var store = {};
        var next = function() {
            done();
        };
        var action = {
            type: "foo/BAR"
        };
        middleware(store)(next)(action);
    });
    describe("set", function() {
        var successAction = {
            type: "foo/LOCAL_SET",
            key: "foo",
            value: "bar"
        };
        var failureAction = {
            type: "foo/LOCAL_SET",
            key: "err",
            value: "err"
        };
        it("dispatches as single request", function(done) {
            return dispatchesSingleAction(successAction, "request", done);
        });
        it("dispatches as mulitple request", function(done) {
            return dispatchesMultipleActions(successAction, "request", done);
        });
        it("dispatches as single success", function(done) {
            return dispatchesSingleAction(successAction, "success", done);
        });
        it("dispatches as mulitple success", function(done) {
            return dispatchesMultipleActions(successAction, "success", done);
        });
        it("dispatches as single failure", function(done) {
            return dispatchesSingleAction(failureAction, "failure", done);
        });
        it("dispatches as mulitple failure", function(done) {
            return dispatchesMultipleActions(failureAction, "failure", done);
        });
        it("request returns appropriate value", function(done) {
            return returnsAppropriateValue(successAction, "request", {
                key: "foo",
                value: "bar"
            }, done);
        });
        it("success returns appropriate value", function(done) {
            return returnsAppropriateValue(successAction, "success", {
                value: "bar"
            }, done);
        });
        it("failure returns appropriate value", function(done) {
            return returnsAppropriateValue(failureAction, "failure", {
                err: "err"
            }, done);
        });
    });
    describe("get", function() {
        var successAction = {
            type: "foo/LOCAL_GET",
            key: "foo"
        };
        var failureAction = {
            type: "foo/LOCAL_GET",
            key: "err"
        };
        it("dispatches as single request", function(done) {
            return dispatchesSingleAction(successAction, "request", done);
        });
        it("dispatches as mulitple request", function(done) {
            return dispatchesMultipleActions(successAction, "request", done);
        });
        it("dispatches as single success", function(done) {
            return dispatchesSingleAction(successAction, "success", done);
        });
        it("dispatches as mulitple success", function(done) {
            return dispatchesMultipleActions(successAction, "success", done);
        });
        it("dispatches as single failure", function(done) {
            return dispatchesSingleAction(failureAction, "failure", done);
        });
        it("dispatches as mulitple failure", function(done) {
            return dispatchesMultipleActions(failureAction, "failure", done);
        });
        it("request returns appropriate value", function(done) {
            return returnsAppropriateValue(successAction, "request", {
                key: "foo"
            }, done);
        });
        it("success returns appropriate value", function(done) {
            return returnsAppropriateValue(successAction, "success", {
                value: "bar"
            }, done);
        });
        it("failure returns appropriate value", function(done) {
            return returnsAppropriateValue(failureAction, "failure", {
                err: "err"
            }, done);
        });
    });
    describe("remove", function() {
        var successAction = {
            type: "foo/LOCAL_REMOVE",
            key: "foo"
        };
        var failureAction = {
            type: "foo/LOCAL_REMOVE",
            key: "err"
        };
        it("dispatches as single request", function(done) {
            return dispatchesSingleAction(successAction, "request", done);
        });
        it("dispatches as mulitple request", function(done) {
            return dispatchesMultipleActions(successAction, "request", done);
        });
        it("dispatches as single success", function(done) {
            return dispatchesSingleAction(successAction, "success", done);
        });
        it("dispatches as mulitple success", function(done) {
            return dispatchesMultipleActions(successAction, "success", done);
        });
        it("dispatches as single failure", function(done) {
            return dispatchesSingleAction(failureAction, "failure", done);
        });
        it("dispatches as mulitple failure", function(done) {
            return dispatchesMultipleActions(failureAction, "failure", done);
        });
        it("request returns appropriate value", function(done) {
            return returnsAppropriateValue(successAction, "request", {
                key: "foo"
            }, done);
        });
        it("success returns appropriate value", function(done) {
            return returnsAppropriateValue(successAction, "success", {}, done);
        });
        it("failure returns appropriate value", function(done) {
            return returnsAppropriateValue(failureAction, "failure", {
                err: "err"
            }, done);
        });
    });
});
var returnsAppropriateValue = function(action, type, value, done) {
    var store = {
        dispatch: function(action) {
            if (action.type === "foo/".concat(type.toUpperCase())) {
                (0, _chai.expect)(action).to.eql(_objectSpread({
                    type: "foo/".concat(type.toUpperCase())
                }, value));
                done();
            }
        }
    };
    var next = function() {};
    var actionWithCallback = _objectSpreadProps(_objectSpread({}, action), _defineProperty({}, type, "".concat(type.toUpperCase())));
    middleware(store)(next)(actionWithCallback);
};
var dispatchesSingleAction = function(action, actionType, done) {
    var store = {
        dispatch: function(action) {
            if (action.type === "foo/".concat(actionType.toUpperCase())) {
                done();
            }
        }
    };
    var next = function() {};
    var actionWithCallback = _objectSpreadProps(_objectSpread({}, action), _defineProperty({}, actionType, actionType.toUpperCase()));
    middleware(store)(next)(actionWithCallback);
};
var dispatchesMultipleActions = function(action, actionType, done) {
    var store = {
        dispatch: function(action) {
            if (action.type === "foo/${actionType.toUpperCase()}2") {
                done();
            }
        }
    };
    var next = function() {};
    var actionWithCallback = _objectSpreadProps(_objectSpread({}, action), {
        request: [
            "${actionType.toUpperCase()}1",
            "${actionType.toUpperCase()}2"
        ]
    });
    middleware(store)(next)(actionWithCallback);
};
