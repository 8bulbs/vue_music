import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYLIST](state, playList) {
    state.playList = playList
  },
  [types.SET_ISPLAY](state, isPlay) {
    state.isPlay = isPlay
  }
}

export default mutations
