import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"

import { API_URL, defaultHeaders } from "../../../helpers/api_helper"

// initialize relavant method of both Auth
const RegisterUrl = `${API_URL}/auth/signup`
const signupHandler = async data => {
  const fetchResponse = await fetch(RegisterUrl, {
    method: "POST",
    headers: { ...defaultHeaders },
    body: JSON.stringify(data),
  })
  return fetchResponse.json()
}

// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(signupHandler, user)
    console.log(response)
    if (!response.success) {
      yield put(registerUserFailed(response.message || "error Creating account"))
    } else {
      yield put(registerUserSuccessful(response))
    }
  } catch (error) {
    yield put(registerUserFailed(error.message))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
