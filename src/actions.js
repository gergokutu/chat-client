export const ALL_MESSAGES = 'ALL_MESSAGE'
export const SET_NAME = 'SET_NAME'

export function allMessages(payload) {
  return {
    type: ALL_MESSAGES,
    payload
  }
}

export function setName(payload) {
  return {
    type: SET_NAME,
    payload
  }
}