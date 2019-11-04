export function nextNotBlackJack(playerTurnInt, blackJackBoolArr) {
    let nextPlayerTurn = playerTurnInt + 1;
    let remainingPlayersSlice = blackJackBoolArr.slice(nextPlayerTurn)
    return remainingPlayersSlice.findIndex(item => item === false) + nextPlayerTurn
}