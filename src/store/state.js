/**
 * native data
 * */

import { playMode } from 'assets/js/config'

const state = {
  singer: {},
  playList: [],
  sequenceList: [],
  isPlay: false,
  fullScreen: false,
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
