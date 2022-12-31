import { createStore, action } from 'easy-peasy'

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  setActiveSongs: action((state, payload) => {
    state.activeSongs = payload
  }),
  setActiveSong: action((state, payload) => {
    state.activeSong = payload
  }),
})
