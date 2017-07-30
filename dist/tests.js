'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _chai = require('chai');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mockLocalStorage = {

  setItem: function setItem(key, value, cb) {

    var err = key === 'err' ? 'err' : null;

    cb(err, value);
  },

  getItem: function getItem(key, cb) {

    var err = key === 'err' ? 'err' : null;

    cb(err, 'bar');
  },

  removeItem: function removeItem(key, cb) {

    var err = key === 'err' ? 'err' : null;

    cb(err);
  }

};

var middleware = (0, _index2.default)(mockLocalStorage);

describe('local middleware', function () {

  it('allows non local actions to pass through', function (done) {

    var store = {};

    var next = function next() {
      done();
    };

    var action = {
      type: 'foo/BAR'
    };

    middleware(store)(next)(action);
  });

  describe('set', function () {

    var successAction = {
      type: 'foo/LOCAL_SET',
      key: 'foo',
      value: 'bar'
    };

    var failureAction = {
      type: 'foo/LOCAL_SET',
      key: 'err',
      value: 'err'
    };

    it('dispatches as single request', function (done) {
      return dispatchesSingleAction(successAction, 'request', done);
    });

    it('dispatches as mulitple request', function (done) {
      return dispatchesMultipleActions(successAction, 'request', done);
    });

    it('dispatches as single success', function (done) {
      return dispatchesSingleAction(successAction, 'success', done);
    });

    it('dispatches as mulitple success', function (done) {
      return dispatchesMultipleActions(successAction, 'success', done);
    });

    it('dispatches as single failure', function (done) {
      return dispatchesSingleAction(failureAction, 'failure', done);
    });

    it('dispatches as mulitple failure', function (done) {
      return dispatchesMultipleActions(failureAction, 'failure', done);
    });

    it('request returns appropriate value', function (done) {
      return returnsAppropriateValue(successAction, 'request', { key: 'foo', value: 'bar' }, done);
    });

    it('success returns appropriate value', function (done) {
      return returnsAppropriateValue(successAction, 'success', { value: 'bar' }, done);
    });

    it('failure returns appropriate value', function (done) {
      return returnsAppropriateValue(failureAction, 'failure', { err: 'err' }, done);
    });
  });

  describe('get', function () {

    var successAction = {
      type: 'foo/LOCAL_GET',
      key: 'foo'
    };

    var failureAction = {
      type: 'foo/LOCAL_GET',
      key: 'err'
    };

    it('dispatches as single request', function (done) {
      return dispatchesSingleAction(successAction, 'request', done);
    });

    it('dispatches as mulitple request', function (done) {
      return dispatchesMultipleActions(successAction, 'request', done);
    });

    it('dispatches as single success', function (done) {
      return dispatchesSingleAction(successAction, 'success', done);
    });

    it('dispatches as mulitple success', function (done) {
      return dispatchesMultipleActions(successAction, 'success', done);
    });

    it('dispatches as single failure', function (done) {
      return dispatchesSingleAction(failureAction, 'failure', done);
    });

    it('dispatches as mulitple failure', function (done) {
      return dispatchesMultipleActions(failureAction, 'failure', done);
    });

    it('request returns appropriate value', function (done) {
      return returnsAppropriateValue(successAction, 'request', { key: 'foo' }, done);
    });

    it('success returns appropriate value', function (done) {
      return returnsAppropriateValue(successAction, 'success', { value: 'bar' }, done);
    });

    it('failure returns appropriate value', function (done) {
      return returnsAppropriateValue(failureAction, 'failure', { err: 'err' }, done);
    });
  });

  describe('remove', function () {

    var successAction = {
      type: 'foo/LOCAL_REMOVE',
      key: 'foo'
    };

    var failureAction = {
      type: 'foo/LOCAL_REMOVE',
      key: 'err'
    };

    it('dispatches as single request', function (done) {
      return dispatchesSingleAction(successAction, 'request', done);
    });

    it('dispatches as mulitple request', function (done) {
      return dispatchesMultipleActions(successAction, 'request', done);
    });

    it('dispatches as single success', function (done) {
      return dispatchesSingleAction(successAction, 'success', done);
    });

    it('dispatches as mulitple success', function (done) {
      return dispatchesMultipleActions(successAction, 'success', done);
    });

    it('dispatches as single failure', function (done) {
      return dispatchesSingleAction(failureAction, 'failure', done);
    });

    it('dispatches as mulitple failure', function (done) {
      return dispatchesMultipleActions(failureAction, 'failure', done);
    });

    it('request returns appropriate value', function (done) {
      return returnsAppropriateValue(successAction, 'request', { key: 'foo' }, done);
    });

    it('success returns appropriate value', function (done) {
      return returnsAppropriateValue(successAction, 'success', {}, done);
    });

    it('failure returns appropriate value', function (done) {
      return returnsAppropriateValue(failureAction, 'failure', { err: 'err' }, done);
    });
  });
});

var returnsAppropriateValue = function returnsAppropriateValue(action, type, value, done) {

  var store = {

    dispatch: function dispatch(action) {

      if (action.type === 'foo/' + type.toUpperCase()) {

        (0, _chai.expect)(action).to.eql(_extends({
          type: 'foo/' + type.toUpperCase()
        }, value));

        done();
      }
    }

  };

  var next = function next() {};

  var actionWithCallback = _extends({}, action, _defineProperty({}, type, '' + type.toUpperCase()));

  middleware(store)(next)(actionWithCallback);
};

var dispatchesSingleAction = function dispatchesSingleAction(action, actionType, done) {

  var store = {
    dispatch: function dispatch(action) {
      if (action.type === 'foo/' + actionType.toUpperCase()) {
        done();
      }
    }
  };

  var next = function next() {};

  var actionWithCallback = _extends({}, action, _defineProperty({}, actionType, actionType.toUpperCase()));

  middleware(store)(next)(actionWithCallback);
};

var dispatchesMultipleActions = function dispatchesMultipleActions(action, actionType, done) {

  var store = {
    dispatch: function dispatch(action) {
      if (action.type === 'foo/${actionType.toUpperCase()}2') {
        done();
      }
    }
  };

  var next = function next() {};

  var actionWithCallback = _extends({}, action, {
    request: ['${actionType.toUpperCase()}1', '${actionType.toUpperCase()}2']
  });

  middleware(store)(next)(actionWithCallback);
};