
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

    const errorAction = {
      type: 'foo/LOCAL_SET',
      key: 'err',
      value: 'err'
    }

    it('dispatches as single request', (done) =>  dispatchSingleAction(successAction, 'request', done))

    it('dispatches as mulitple request', (done) =>  dispatchMultipleActions(successAction, 'request', done))

    it('dispatches as single success', (done) =>  dispatchSingleAction(successAction, 'success', done))

    it('dispatches as mulitple success', (done) =>  dispatchMultipleActions(successAction, 'success', done))

    it('dispatches as single failure', (done) =>  dispatchSingleAction(errorAction, 'failure', done))

    it('dispatches as mulitple failure', (done) =>  dispatchMultipleActions(errorAction, 'failure', done))

  })

  describe('get', () => {

    const successAction = {
      type: 'foo/LOCAL_GET',
      key: 'foo'
    }

    const errorAction = {
      type: 'foo/LOCAL_GET',
      key: 'err'
    }

    it('dispatches as single request', (done) =>  dispatchSingleAction(successAction, 'request', done))

    it('dispatches as mulitple request', (done) =>  dispatchMultipleActions(successAction, 'request', done))

    it('dispatches as single success', (done) =>  dispatchSingleAction(successAction, 'success', done))

    it('dispatches as mulitple success', (done) =>  dispatchMultipleActions(successAction, 'success', done))

    it('dispatches as single failure', (done) =>  dispatchSingleAction(errorAction, 'failure', done))

    it('dispatches as mulitple failure', (done) =>  dispatchMultipleActions(errorAction, 'failure', done))

  })

  describe('remove', () => {

    const successAction = {
      type: 'foo/LOCAL_REMOVE',
      key: 'foo'
    }

    const errorAction = {
      type: 'foo/LOCAL_REMOVE',
      key: 'err'
    }

    it('dispatches as single request', (done) =>  dispatchSingleAction(successAction, 'request', done))

    it('dispatches as mulitple request', (done) =>  dispatchMultipleActions(successAction, 'request', done))

    it('dispatches as single success', (done) =>  dispatchSingleAction(successAction, 'success', done))

    it('dispatches as mulitple success', (done) =>  dispatchMultipleActions(successAction, 'success', done))

    it('dispatches as single failure', (done) =>  dispatchSingleAction(errorAction, 'failure', done))

    it('dispatches as mulitple failure', (done) =>  dispatchMultipleActions(errorAction, 'failure', done))

  })

})

const dispatchSingleAction = (action, actionType, done) => {

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

const dispatchMultipleActions = (action, actionType, done) => {

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
