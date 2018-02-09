let playCount = playCount => {
  return (playCount / 10000).toFixed(1) + '万'
}

let strLimit = (str, num = 16) => {
  return str.split('').splice(0, num).join('')
}

export { playCount, strLimit }
