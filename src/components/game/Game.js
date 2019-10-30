import React, { Component } from 'react'
import Dealer from '../dealer/Dealer'
import Players from "../players/Players"
import DefaultBtn from '../buttons/DefaultBtn'
import BeforeDeal from '../beforeDeal/BeforeDeal'
import './Game.css'

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handOpen: false,
      playerIndexTurn: 0,
      dealerTurn: false,
      numberOfDecks: 1,
      dealerPoints: 0,
      numberOfPlayers: 4,
      playerPoints: 0,
      cardsDealt: [],
      allPlayersCards: [],
      dealersCards: [],
      playerHits: 0
    };
  }

  newDeal = () => {
    let openingDeal = (this.state.numberOfPlayers + 1) * 2
    let deckOfCardsUrl = `https://deckofcardsapi.com/api/deck/hrosz2hydqqk/draw/?count=${openingDeal}`

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
        let totalIteration = this.state.numberOfPlayers + 1
        let playerCards = []
        for (let i = 0; i < totalIteration; i++) {
          playerCards.push([data.cards[i], data.cards[i + totalIteration]])
        }
        this.setState({
          cardsDealt: data.cards,
          allPlayersCards: playerCards.slice(0, playerCards.length - 1),
          dealersCards: playerCards[playerCards.length - 1],
          handOpen: true
        })
      })
      .catch(function(error) {
        console.log("Request failed", error)
      })
  }

  hitNext = () => {
    let deckOfCardsUrl = 'https://deckofcardsapi.com/api/deck/hrosz2hydqqk/draw/?count=1'

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
        if (!this.state.dealerTurn) {
          const { playerIndexTurn, allPlayersCards } = this.state
          let previouslyDealtCards = allPlayersCards
          let addedCard = allPlayersCards[playerIndexTurn].concat(data.cards[0])
          let adjustedPlayersCards = allPlayersCards.map((item, key) => key !== playerIndexTurn ? item = item : item = addedCard)
          console.log(addedCard, adjustedPlayersCards, allPlayersCards)
          this.setState({
            allPlayersCards: adjustedPlayersCards
          })
        }
      })
      .catch(function(error) {
        console.log("Request failed", error)
      })

  }

  // If you are not getting an opening deal then shuffle the deck (API Quirk)
  shuffleDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/hrosz2hydqqk/shuffle/");
  };

  consoleState = () => {
    console.log(this.state.allPlayersCards)
  }

  render() {
    return (
      <div className='game-wrap'>
        <h1>Black Jack</h1>
        <DefaultBtn
        txtParent={'Console State'}
        callBackParent={this.consoleState}
        />
        {this.state.cardsDealt.length === 0 ? (
          <BeforeDeal
          dealParent={this.newDeal}
          shuffleDeckParent={this.shuffleDeck} />
        ) : (
          <div>
            <Dealer
              dealerCardsGame={this.state.dealersCards}
            />
            <Players
              numPlayersGame={this.state.numberOfPlayers}
              playersCardsGame={this.state.allPlayersCards}
              hitNextGame={this.hitNext}
            />
          </div>
        )}
      </div>
    );
  }
}
