import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"
import { defaultHeaders } from "../../../helpers/api_helper"

const backendUrl = "http://localhost:4000/api/auth/signin"

const loginHandler = async data => {
  console.log(data)
  const fetchResponse = await fetch(backendUrl, {
    method: "POST",
    headers: { ...defaultHeaders },
    body: JSON.stringify(data),
  })
  return fetchResponse.json()
}

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(loginHandler, { ...user })
    console.log(response)

    if (!response.success) {
      yield put(apiError(response.message || "an error occurred"))
    } else {
      localStorage.setItem("authUser", JSON.stringify(response.result))
      yield put(loginSuccess(response.result))

      history.push("/dashboard")
    }
  } catch (error) {
    console.log("loginError=>", error.message)
    yield put(apiError(error.message))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    yield put(logoutUserSuccess("Logged out"))

    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
