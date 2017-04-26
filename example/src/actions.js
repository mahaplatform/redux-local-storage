import * as actionTypes from './action_types'

export const getSession = () => ({
  type: 'LOCAL_GET',
  key: 'session',
  request: actionTypes.GET_SESSION_REQUEST,
  success: actionTypes.GET_SESSION_SUCCESS,
  failure: actionTypes.GET_SESSION_FAILURE
})

export const setSession = (value) => ({
  type: 'LOCAL_SET',
  key: 'session',
  value,
  request: actionTypes.SET_SESSION_REQUEST,
  success: actionTypes.SET_SESSION_SUCCESS,
  failure: actionTypes.SET_SESSION_FAILURE
})

export const removeSession = () => ({
  type: 'LOCAL_REMOVE',
  key: 'session',
  request: actionTypes.REMOVE_SESSION_REQUEST,
  success: actionTypes.REMOVE_SESSION_SUCCESS,
  failure: actionTypes.REMOVE_SESSION_FAILURE
})
