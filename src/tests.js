import { expect } from 'chai'

import localMiddleware from './index'

const mockLocalStorage = {

  setItem: (key, value, cb) => {

    const err = (key === 'err') ? 'err' : null

    cb(err, value)

  },

  getItem: (key, cb) => {

    const err = (key === 'err') ? 'err' : null

    cb(err, 'bar')

  },

  removeItem: (key, cb) => {

    const err = (key === 'err') ? 'err' : null

    cb(err)

  }

}

const middleware = localMiddleware(mockLocalStorage)

describe('local middleware', () => {

  it('allows non local actions to pass through', (done) => {

    const store = {}

    const next = () => {
      done()
    }

    const action = {
      type: 'foo/BAR'
    }

    middleware(store)(next)(action)

  })

  describe('set', () => {

    const successAction = {
      type: 'foo/LOCAL_SET',
      key: 'foo',
      value: 'bar'
    }

    const failureAction = {
      type: 'foo/LOCAL_SET',
      key: 'err',
      value: 'err'
    }

    it('dispatches as single request', (done) =>  dispatchesSingleAction(successAction, 'request', done))

    it('dispatches as mulitple request', (done) =>  dispatchesMultipleActions(successAction, 'request', done))

    it('dispatches as single success', (done) =>  dispatchesSingleAction(successAction, 'success', done))

    it('dispatches as mulitple success', (done) =>  dispatchesMultipleActions(successAction, 'success', done))

    it('dispatches as single failure', (done) =>  dispatchesSingleAction(failureAction, 'failure', done))

    it('dispatches as mulitple failure', (done) =>  dispatchesMultipleActions(failureAction, 'failure', done))

    it('request returns appropriate value', (done) => returnsAppropriateValue(successAction, 'request', { key: 'foo', value: 'bar' }, done))

    it('success returns appropriate value', (done) => returnsAppropriateValue(successAction, 'success', { value: 'bar' }, done))

    it('failure returns appropriate value', (done) => returnsAppropriateValue(failureAction, 'failure', { err: 'err' }, done))

  })

  describe('get', () => {

    const successAction = {
      type: 'foo/LOCAL_GET',
      key: 'foo'
    }

    const failureAction = {
      type: 'foo/LOCAL_GET',
      key: 'err'
    }

    it('dispatches as single request', (done) =>  dispatchesSingleAction(successAction, 'request', done))

    it('dispatches as mulitple request', (done) =>  dispatchesMultipleActions(successAction, 'request', done))

    it('dispatches as single success', (done) =>  dispatchesSingleAction(successAction, 'success', done))

    it('dispatches as mulitple success', (done) =>  dispatchesMultipleActions(successAction, 'success', done))

    it('dispatches as single failure', (done) =>  dispatchesSingleAction(failureAction, 'failure', done))

    it('dispatches as mulitple failure', (done) =>  dispatchesMultipleActions(failureAction, 'failure', done))

    it('request returns appropriate value', (done) => returnsAppropriateValue(successAction, 'request', { key: 'foo' }, done))

    it('success returns appropriate value', (done) => returnsAppropriateValue(successAction, 'success', { value: 'bar' }, done))

    it('failure returns appropriate value', (done) => returnsAppropriateValue(failureAction, 'failure', { err: 'err' }, done))

  })

  describe('remove', () => {

    const successAction = {
      type: 'foo/LOCAL_REMOVE',
      key: 'foo'
    }

    const failureAction = {
      type: 'foo/LOCAL_REMOVE',
      key: 'err'
    }

    it('dispatches as single request', (done) =>  dispatchesSingleAction(successAction, 'request', done))

    it('dispatches as mulitple request', (done) =>  dispatchesMultipleActions(successAction, 'request', done))

    it('dispatches as single success', (done) =>  dispatchesSingleAction(successAction, 'success', done))

    it('dispatches as mulitple success', (done) =>  dispatchesMultipleActions(successAction, 'success', done))

    it('dispatches as single failure', (done) =>  dispatchesSingleAction(failureAction, 'failure', done))

    it('dispatches as mulitple failure', (done) =>  dispatchesMultipleActions(failureAction, 'failure', done))

    it('request returns appropriate value', (done) => returnsAppropriateValue(successAction, 'request', { key: 'foo' }, done))

    it('success returns appropriate value', (done) => returnsAppropriateValue(successAction, 'success', {}, done))

    it('failure returns appropriate value', (done) => returnsAppropriateValue(failureAction, 'failure', { err: 'err' }, done))

  })

})

const returnsAppropriateValue = (action, type, value, done) => {

  const store = {

    dispatch: (action) => {

      if(action.type === `foo/${type.toUpperCase()}`) {

        expect(action).to.eql({
          type: `foo/${type.toUpperCase()}`,
          ...value
        })

        done()

      }

    }

  }

  const next = () => {}

  const actionWithCallback = {
    ...action,
    [type]: `${type.toUpperCase()}`
  }

  middleware(store)(next)(actionWithCallback)

}

const dispatchesSingleAction = (action, actionType, done) => {

  const store = {
    dispatch: (action) => {
      if(action.type === `foo/${actionType.toUpperCase()}`) {
        done()
      }
    }
  }

  const next = () => {}

  const actionWithCallback = {
    ...action,
    [actionType]: actionType.toUpperCase()
  }

  middleware(store)(next)(actionWithCallback)

}

const dispatchesMultipleActions = (action, actionType, done) => {

  const store = {
    dispatch: (action) => {
      if(action.type === 'foo/${actionType.toUpperCase()}2') {
        done()
      }
    }
  }

  const next = () => {}

  const actionWithCallback = {
    ...action,
    request: ['${actionType.toUpperCase()}1','${actionType.toUpperCase()}2']
  }

  middleware(store)(next)(actionWithCallback)

}
