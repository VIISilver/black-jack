import React, { Component } from "react";
import Dealer from "../dealer/Dealer";
import Players from "../players/Players";
import DefaultBtn from "../buttons/DefaultBtn";
import "./Game.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handOpen: false,
      numberOfDecks: 1,
      dealerPoints: 0,
      numberOfPlayers: 1,
      playerPoints: 0,
      cardsDealt: [],
      playerHits: 0
    };
  }

  newDeal = () => {
    let openingDeal = (this.state.numberOfPlayers + 1) * 2;
    let deckOfCardsUrl = `https://deckofcardsapi.com/api/deck/hrosz2hydqqk/draw/?count=${openingDeal}`;

    function status(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    }

    function json(response) {
      return response.json();
    }

    fetch(deckOfCardsUrl)
      .then(status)
      .then(json)
      .then(data =>
        this.setState({
          cardsDealt: data.cards,
          handOpen: !this.state.handOpen
        })
      )
      .catch(function(error) {
        console.log("Request failed", error);
      });
  };

  // If you are not getting an opening deal then shuffle the deck (API Quirk)
  shuffleDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/hrosz2hydqqk/shuffle/");
  };

  render() {
    return (
      <div className='game-wrap'>
        <h1>Black Jack</h1>
        <DefaultBtn
          displayBoolParent={this.state.handOpen}
          callBackParent={this.newDeal}
          txtParent={'Deal'}
        />
        {this.state.cardsDealt.length === 0 ? (
          <div>
            <h2>Waiting for the Player to Press Deal...</h2>
            <p>
              If the deal button is not working press the shuffle button. Sends
              a request to the server to reset the deck.
            </p>
            <DefaultBtn
              callBackParent={this.shuffleDeck}
              txtParent={'Shuffle Deck'}
            />
          </div>
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
            />
          </div>
        )}
      </div>
    );
  }
}
