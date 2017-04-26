import * as actionTypes from './action_types'

const INITIAL_STATE = {
  status: 'pending',
  value: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.GET_SESSION_REQUEST:
    return {
      ...state,
      status: 'getting'
    }

  case actionTypes.GET_SESSION_SUCCESS:
    return {
      ...state,
      status: 'success',
      value: action.value
    }

  case actionTypes.GET_SESSION_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.SET_SESSION_REQUEST:
    return {
      ...state,
      status: 'setting'
    }

  case actionTypes.SET_SESSION_SUCCESS:
    return {
      ...state,
      status: 'success',
      value: action.value
    }

  case actionTypes.SET_SESSION_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  case actionTypes.REMOVE_SESSION_REQUEST:
    return {
      ...state,
      status: 'removing'
    }

  case actionTypes.REMOVE_SESSION_SUCCESS:
    return {
      ...state,
      status: 'success',
      value: null
    }

  case actionTypes.REMOVE_SESSION_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}
