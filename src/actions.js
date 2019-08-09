export const ALL_CHANNELS = 'ALL_CHANNELS'
export const SET_NAME = 'SET_NAME'

export function allChannels(payload) {
  return {
    type: ALL_CHANNELS,
    payload
  }
}

export function setName(payload) {
  return {
    type: SET_NAME,
    payload
  }
}