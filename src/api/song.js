import axios from 'axios'
import { URL } from 'api/config'

export function getSong(id) {
  return axios.get(URL + '/song/detail?ids=' + id)
}
