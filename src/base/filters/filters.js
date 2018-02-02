let playCount = playCount => {
  return (playCount / 10000).toFixed(1) + '万'
}

export { playCount }
