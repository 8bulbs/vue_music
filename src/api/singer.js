import axios from 'axios'
import { URL } from 'api/config'

export function getSingerList() {
  return axios.get(URL + '/toplist/artist')
}

export function getSingerSongs(id) {
  return axios.get(URL + '/artists?id=' + id)
}

export function getSingerSong(id) {
  return axios.get(URL + '/song/detail?ids=' + id)
}
