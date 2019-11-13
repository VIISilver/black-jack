import React, { Component } from "react";
import { parseCardValues, parseDataObject, parseCardArr } from "../../functionalComp/HandValueFunctions";
import { nextNotBlackJack } from "../../functionalComp/NextNotBlackJack";
// import { checkAces } from "../../functionalComp/CheckAces";
import Dealer from "../dealer/Dealer";
import Players from "../players/Players";
import DefaultBtn from "../buttons/DefaultBtn";
import BeforeDeal from "../beforeDeal/BeforeDeal";
import "./Game.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handOpen: false,
      playerIndexTurn: 0,
      dealerTurn: false,
      numberOfDecks: 1,
      dealerGamePoints: 0,
      dealerHandPoints: [],
      numberOfPlayers: 4,
      bustArr: [],
      dealerBlackJackBool: false,
      blackJackArr: [],
      playersHandPoints: [],
      playersGamePoints: [],
      cardsDealt: [],
      allPlayersCards: [],
      dealersCards: []
    };
  }

  componentDidMount() {
    let playerIteration = this.state.numberOfPlayers;
    let bustArrToSet = [];
    let playersGamePointsArrToSet = [];
    for (let i = 0; i < playerIteration; i++) {
      bustArrToSet.push(false);
      playersGamePointsArrToSet.push(0);
    }
    this.setState({
      bustArr: bustArrToSet,
      playersGamePoints: playersGamePointsArrToSet
    });
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
      .then(data => {
        let totalIteration = this.state.numberOfPlayers + 1;
        let playerCards = [];
        for (let i = 0; i < totalIteration; i++) {
          playerCards.push([data.cards[i], data.cards[i + totalIteration]]);
        }
        let openingHandPtsArr = playerCards.map(item => parseCardValues(item));
        let playersOpenHandPts = openingHandPtsArr.slice(
          0,
          playerCards.length - 1
        );
        let dealersOpeningHandPts = openingHandPtsArr[playerCards.length - 1];
        let playerBlackJackBoolArr = playersOpenHandPts.map(
          item => item === 21
        );
        let startingPlayer = playerBlackJackBoolArr.findIndex(item => item === false)
        let blackJackDealerBool = dealersOpeningHandPts === 21;
        this.setState({
          cardsDealt: data.cards,
          playerIndexTurn: startingPlayer,
          allPlayersCards: playerCards.slice(0, playerCards.length - 1),
          dealersCards: playerCards[playerCards.length - 1],
          playersHandPoints: playersOpenHandPts,
          blackJackArr: playerBlackJackBoolArr,
          dealerHandPoints: dealersOpeningHandPts,
          dealerBlackJackBool: blackJackDealerBool,
          handOpen: true
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  hitNext = () => {
    let deckOfCardsUrl =
      "https://deckofcardsapi.com/api/deck/hrosz2hydqqk/draw/?count=1";

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
      .then(data => {
        const { playerIndexTurn, allPlayersCards, playersHandPoints } = this.state;
        let addedCard = allPlayersCards[playerIndexTurn].concat(data.cards[0]);

        let playerPoints = parseCardValues(addedCard);
        let playerStrVals = parseDataObject(addedCard)
        if (playerPoints > 21 && playerStrVals.includes('ACE')) {
          recursiveAces(addedCard)
        }

        function recursiveAces(updatedCardArr) {
          let newValues = updatedCardArr.map(item => item.value).join(',').replace('ACE', '1').split(',')
          let newCardObj = updatedCardArr.map((item, index) => {
            let cardNew = {
              image: item['image'],
              value: newValues[index]
            }
            return cardNew
          })

          if (parseCardValues(newCardObj) > 21 && parseDataObject(newCardObj).includes('ACE')) {
            recursiveAces(newCardObj)
          } else {
            addedCard = newCardObj
            playerPoints = parseCardValues(newCardObj)
          }
        }

        if (playerPoints >= 21 && !parseCardArr(addedCard).includes(11)) {
          this.holdHand()
          console.log('holdHand() fired')
        }

        let adjustedPlayersHandPoints = playersHandPoints.map((item, key) => key !== playerIndexTurn ? item : (item = playerPoints))
        let adjustedPlayersCards = allPlayersCards.map((item, key) =>
          key !== playerIndexTurn ? item : (item = addedCard)
        );
        this.setState({
          allPlayersCards: adjustedPlayersCards,
          playersHandPoints: adjustedPlayersHandPoints
        });
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  holdHand = () => {
    let nextPlayerNotBlackJack = nextNotBlackJack(this.state.playerIndexTurn, this.state.blackJackArr)
    this.setState({
      playerIndexTurn: nextPlayerNotBlackJack
    });
  };

  // If you are not getting an opening deal then shuffle the deck (API Quirk)
  shuffleDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/hrosz2hydqqk/shuffle/");
  };

  consoleState = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="game-wrap">
        <h1>Black Jack</h1>
        <DefaultBtn
          txtParent={"Console State"}
          callBackParent={this.consoleState}
        />
        {this.state.cardsDealt.length === 0 ? (
          <BeforeDeal
            dealParent={this.newDeal}
            shuffleDeckParent={this.shuffleDeck}
          />
        ) : (
            <div>
              <Dealer dealerCardsGame={this.state.dealersCards} />
              <Players
                numPlayersGame={this.state.numberOfPlayers}
                playersCardsGame={this.state.allPlayersCards}
                hitNextGame={this.hitNext}
                holdHandGame={this.holdHand}
                playersTurnIndexGame={this.state.playerIndexTurn}
                playersBlackJackBoolArrGame={this.state.blackJackArr}
                playerPointsGame={this.state.playersHandPoints}
              />
            </div>
          )}
      </div>
    );
  }
}
