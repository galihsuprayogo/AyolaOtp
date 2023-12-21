export const secondsToMs = (val: number) => {
  const m = Math.floor((val % 3600) / 60)
  const s = Math.floor((val % 3600) % 60)

  const mDisplay = m < 10 ? `0${m}:` : `${m}`
  const sDisplay = s < 10 ? `0${s}` : `${s}`

  return mDisplay + sDisplay
}
