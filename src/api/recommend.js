import axios from 'axios'
import { URL } from 'api/config'

export function test() {
  return axios.get(URL + '/recommend/resource')
}

export function getBanner() {
  return axios.get(URL + '/banner')
}

export function getRecommend() {
  return axios.get(URL + '/personalized')
}

export function getNewSong() {
  return axios.get(URL + '/personalized/newsong')
}
