import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods

import { postEditProfile } from "../../../helpers/fakebackend_helper"

function* editProfile({ payload: { user } }) {
  try {
    // const response = yield call(postEditProfile, {
    //   username: user.username,
    //   idx: user.idx,
    // })

    yield put(profileError("Not Allowed to change username"))

    // yield put(profileSuccess(""))
  } catch (error) {
    yield put(profileError(error.message || "An error occurred updating username"))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
