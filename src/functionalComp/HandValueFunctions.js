export function parseCardValues(cardArr) {
  let cards = cardArr.map(item => item.value)
  return cards.map(item =>
    item === "JACK" || item === "QUEEN" || item === "KING"
      ? 10
      : item === "ACE"
      ? 11
      : parseInt(item)
  )
}
