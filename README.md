# redux-local-storage

<a href="https://circleci.com/gh/thinktopography/redux-api-request">
  <img src="https://img.shields.io/circleci/project/thinktopography/redux-api-request.svg?maxAge=600" alt="Build Status" >
</a>
<a href="https://codeclimate.com/github/thinktopography/redux-api-request">
  <img src="https://img.shields.io/codeclimate/github/thinktopography/redux-api-request.svg?maxAge=600" alt="Code Climate" />
</a>
<a href="https://codeclimate.com/github/thinktopography/redux-api-request/coverage">
  <img src="https://img.shields.io/codeclimate/coverage/github/thinktopography/redux-api-request.svg?maxAge=600" alt="Code Coverage" />
</a>

Redux middleware for accessing local storage

## Installation
Install with [npm](http://npmjs.com) or [yarn](https://yarnpkg.com):

```sh
npm install --save redux-api-request
```

## Usage
Using redux-local-storage in your application is easy:

```javascript
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
