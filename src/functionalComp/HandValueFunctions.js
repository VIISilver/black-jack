export function parseDataObject(cardArrRaw) {
  return cardArrRaw.map(item => item.value)
}

export function parseCardArr(cardArrStr) {
  let cardsInt = parseDataObject(cardArrStr)
  return cardsInt.map(item =>
    item === "JACK" || item === "QUEEN" || item === "KING"
      ? 10
      : item === "ACE"
      ? 11
      : parseInt(item)
  )
}

export function parseCardValues(cardArrInt) {
  return parseCardArr(cardArrInt).reduce((acc, currentVal) => acc + currentVal)
}
