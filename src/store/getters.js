/**
 * define how to mapping the data to components   agent & computed attributes
 * */

export const singer = state => state.singer

export const playList = state => state.playList

export const fullScreen = state => state.fullScreen

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = state => state.playList[state.currentIndex] || {}
