export const ALL_MESSAGES = 'ALL_MESSAGE'

export function allMessages(payload) {
  return {
    type: ALL_MESSAGES,
    payload
  }
}