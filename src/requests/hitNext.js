export default function hitNext(playerIndexTurn, allPlayersCards) {
    let deckOfCardsUrl =
      "https://deckofcardsapi.com/api/deck/hrosz2hydqqk/draw/?count=1"

    function status(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    }

    function json(response) {
      return response.json()
    }

    fetch(deckOfCardsUrl)
      .then(status)
      .then(json)
      .then(data => {
        let addedCard = allPlayersCards[playerIndexTurn].concat(
          data.cards[0]
        )
        let adjustedPlayersCards = allPlayersCards.map((item, key) =>
          key !== playerIndexTurn ? item : (item = addedCard)
        )
        this.setState({
          allPlayersCards: adjustedPlayersCards
        })
      })
      .catch(function(error) {
        console.log("Request failed", error)
      })
}