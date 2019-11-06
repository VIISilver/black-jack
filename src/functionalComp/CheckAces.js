export function checkAces(cardsArr) {
    return cardsArr.join(',').replace(',11,', ',1,').split(',').map(item => +item)
}