<img src="https://raw.githubusercontent.com/mahaplatform/redux-local-storage/master/docs/logo.png" title="Redux Local Storage" alt="Redux Local Storage"/>

<a href="https://circleci.com/gh/mahaplatform/redux-local-storage">
  <img src="https://img.shields.io/circleci/project/mahaplatform/redux-local-storage.svg?maxAge=600" alt="Build Status" >
</a>
<a href="https://codeclimate.com/github/mahaplatform/redux-local-storage">
  <img src="https://img.shields.io/codeclimate/github/mahaplatform/redux-local-storage.svg?maxAge=600" alt="Code Climate" />
</a>
<a href="https://codeclimate.com/github/mahaplatform/redux-local-storage/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/mahaplatform/redux-local-storage.svg?maxAge=600" alt="Code Coverage" />
</a>

Redux middleware for accessing local storage

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save redux-local-storage
```

## Usage
Using redux-local-storage in your application is easy:

```javascript
# install middleware
import createLocalStorage from 'redux-local-storage'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

const localStorageMiddleware = createLocalStorage()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  localStorageMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

# action creator
import { LOCAL_GET, LOCAL_SET, LOCAL_REMOVE } from 'redux-local-storage/action_types'

export const getSession = () => ({
  type: LOCAL_GET,
  key: 'session',
  request: GET_SESSION_REQUEST,
  success: GET_SESSION_SUCCESS,
  failure: GET_SESSION_FAILURE
})

export const setSession = (session) => ({
  type: LOCAL_SET,
  key: 'session',
  value: session,
  request: SET_SESSION_REQUEST,
  success: SET_SESSION_SUCCESS,
  failure: SET_SESSION_FAILURE
})

export const removeSession = () => ({
  type: LOCAL_REMOVE,
  key: 'session',
  request: REMOVE_SESSION_REQUEST,
  success: REMOVE_SESSION_SUCCESS,
  failure: REMOVE_SESSION_FAILURE
})
```

[View example app](https://github.com/mahaplatform/redux-local-storage/tree/master/example)

## Author & Credits

redux-local-storage was originally written by [Greg Kops](https://github.com/mochini) and
is based upon his work with [Think Topography](http://thinktopography.com) and
[The Cornell Cooperative Extension of Tompkins County](http://ccetompkins.org)
