import React, { Component } from "react";
import Dealer from "../dealer/Dealer";
import Players from "../players/Players";
import DefaultBtn from "../buttons/DefaultBtn";
import BeforeDeal from '../beforeDeal/BeforeDeal'
import "./Game.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handOpen: false,
      playerIndexTurn: 0,
      numberOfDecks: 1,
      dealerPoints: 0,
      numberOfPlayers: 1,
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
        let playerCards = []
        let totalIteration = this.state.numberOfPlayers + 1
        for (let i = 0; i < totalIteration; i++) {
          playerCards.push([data.cards[i], data.cards[i + totalIteration]])
        }
        console.log(data.cards)
        this.setState({
          cardsDealt: data.cards,
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
      .then(data =>
        this.setState({
          cardsDealt: this.state.cardsDealt.concat(data.cards),
          handOpen: true
        })
      )
      .catch(function(error) {
        console.log("Request failed", error)
      })

  }

  // If you are not getting an opening deal then shuffle the deck (API Quirk)
  shuffleDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/hrosz2hydqqk/shuffle/");
  };

  consoleState = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div className='game-wrap'>
        <h1>Black Jack</h1>
        <DefaultBtn
        txtParent={'Console State'}
        callBackParent={this.consoleState}
        />
        <DefaultBtn
          displayBoolParent={this.state.handOpen}
          callBackParent={this.newDeal}
          txtParent={'Deal'}
        />
        {this.state.cardsDealt.length === 0 ? (
          <BeforeDeal
          shuffleDeckParent={this.shuffleDeck} />
        ) : (
          <div>
            <Dealer
              dealerCardsGame={this.state.cardsDealt.filter(
                (item, key) => key % 2 !== 0
              )}
            />
            <Players
              numPlayersGame={this.state.numberOfPlayers}
              playersCardsGame={this.state.cardsDealt.filter(
                (item, key) => key % 2 === 0
              )}
              hitNextGame={this.hitNext}
            />
            <DefaultBtn
            callBackParent={this.hitNext}
            txtParent={'Hit'}
            />
          </div>
        )}
      </div>
    );
  }
}
