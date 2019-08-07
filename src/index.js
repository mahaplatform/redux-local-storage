import _ from 'lodash'
import localforage from 'localforage'
import * as actionTypes from './action_types'

const defaultClient = localforage.createInstance({
  name: 'local',
  storeName: 'cache'
})

export default (client = defaultClient) => {

  return store => next => action => {

    const [, namespace, type] = action.type.match(/([\a-z0-9_\.]*)?\/?([A-Z0-9_]*)/)

    const cid = (action.cid) ? { cid: action.cid } : {}

    switch (type) {

    case actionTypes.LOCAL_SET:

      coerceArray(action.request).map(requestAction => {
        store.dispatch({
          type: withNamespace(namespace, requestAction),
          ...action.meta,
          ...cid,
          key: action.key,
          value: action.value
        })
      })

      return client.setItem(action.key, action.value, (err, value) => {

        if(err) {
          coerceArray(action.failure).map(failureAction => {
            store.dispatch({
              type: withNamespace(namespace, failureAction),
              ...action.meta,
              ...cid,
              err
            })
          })
        }

        coerceArray(action.success).map(successAction => {
          store.dispatch({
            type: withNamespace(namespace, successAction),
            ...action.meta,
            ...cid,
            value
          })
        })

      })

    case actionTypes.LOCAL_GET:

      coerceArray(action.request).map(requestAction => {
        store.dispatch({
          type: withNamespace(namespace, requestAction),
          ...action.meta,
          ...cid,
          key: action.key
        })
      })

      return client.getItem(action.key, (err, value) => {

        if(err) {
          coerceArray(action.failure).map(failureAction => {
            store.dispatch({
              type: withNamespace(namespace, failureAction),
              ...action.meta,
              ...cid,
              err
            })
          })
        }

        coerceArray(action.success).map(successAction => {
          store.dispatch({
            type: withNamespace(namespace, successAction),
            ...action.meta,
            ...cid,
            value
          })
        })

      })

    case actionTypes.LOCAL_REMOVE:

      coerceArray(action.request).map(requestAction => {
        store.dispatch({
          type: withNamespace(namespace, requestAction),
          ...action.meta,
          ...cid,
          key: action.key
        })
      })

      return client.removeItem(action.key, (err, value) => {

        if(err) {
          coerceArray(action.failure).map(failureAction => {
            store.dispatch({
              type: withNamespace(namespace, failureAction),
              ...action.meta,
              ...cid,
              err
            })
          })
        }

        coerceArray(action.success).map(successAction => {
          store.dispatch({
            type: withNamespace(namespace, successAction),
            ...action.meta,
            ...cid
          })
        })

      })

    default:

      return next(action)

    }

  }

}

const coerceArray = (value) => {
  return value ? (!_.isArray(value) ? [value] : value) : []
}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}
