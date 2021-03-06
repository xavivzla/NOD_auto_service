import { Post } from 'lib/Request'
import { put, call } from 'redux-saga/effects'

export const createContact = ({ types }) => function* ({ data }) {
  try {
    yield put({ type: types.POST_PENDING })

    const { success: messageSend } = yield call(Post, '/contact', data)

    yield put({
      payload: {
        messageSend
      },
      type: types.POST_FULFILLED
    })
  } catch (e) {
    const { type, message, response: { data: { message: messageResponse } = {} } = {} } = e
    switch (type) {
      case 'cancel':
        yield put({ type: types.FETCH_CANCEL })
        break
      default:
        yield put({
          error: messageResponse || message,
          type : types.FETCH_FAILURE
        })
        break
    }
  }
}
