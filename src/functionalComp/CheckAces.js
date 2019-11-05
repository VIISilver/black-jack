export function checkAces(cardsArr) {
    let indexOfAce = cardsArr.findIndex(item => item === 11)
    return cardsArr.splice(indexOfAce, 1, 1)
}