import React, { Component } from "react";
import { parseCardValues, parseDataObject, parseCardArr } from "../../functionalComp/HandValueFunctions";
import { nextNotBlackJack } from "../../functionalComp/NextNotBlackJack";
import Dealer from "../dealer/Dealer";
import Players from "../players/Players";
import DefaultBtn from "../buttons/DefaultBtn";
import BeforeDeal from "../beforeDeal/BeforeDeal";
import ResultModal from '../modals/ResultModal'
import "./Game.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerIndexTurn: 0,
      numberOfDecks: 1,
      dealerGamePoints: 0,
      dealerHandPoints: [],
      numberOfPlayers: 1,
      bustArr: [],
      dealerBlackJackBool: false,
      cardsFlippedArr: [false, true],
      blackJackArr: [],
      playersHandPoints: [],
      playersGamePoints: [],
      cardsDealt: [],
      allPlayersCards: [],
      resultsModal: false,
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
          if (data.cards[i].value === 'ACE' && data.cards[i + totalIteration].value === 'ACE') {
            let newFirstCard = {
              image: data.cards[i].image,
              value: '1'
            }
            playerCards.push([newFirstCard, data.cards[i + totalIteration]]);
          } else {
            playerCards.push([data.cards[i], data.cards[i + totalIteration]]);
          }
        }
        let openingHandPtsArr = playerCards.map(item => parseCardValues(item));
        let playersOpenHandPts = openingHandPtsArr.slice(0, playerCards.length - 1);
        let dealersOpeningHandPts = openingHandPtsArr[playerCards.length - 1];
        let playerBlackJackBoolArr = playersOpenHandPts.map(item => item === 21);
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
          dealerBlackJackBool: blackJackDealerBool
        }, () => {
          if (blackJackDealerBool) {
            this.determineResultOfHand()
          }
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
        let addedCard = playerIndexTurn !== -1 ? allPlayersCards[playerIndexTurn].concat(data.cards[0]) :
          this.state.dealersCards.concat(data.cards[0]);

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

        if (playerPoints > 21 && !parseCardArr(addedCard).includes(11)) {
          this.holdHand()
        }

        if (playerPoints === 21) {
          this.holdHand()
        }

        let adjustedPlayersHandPoints = playersHandPoints.map((item, key) => key !== playerIndexTurn ? item : (item = playerPoints))
        let adjustedPlayersCards = allPlayersCards.map((item, key) => key !== playerIndexTurn ? item : (item = addedCard));

        if (playerIndexTurn !== -1) {
          this.setState({
            allPlayersCards: adjustedPlayersCards,
            playersHandPoints: adjustedPlayersHandPoints
          });
        } else {

          // Dealer actions
          this.setState({
            dealersCards: addedCard,
            dealerHandPoints: playerPoints
          }, () => {
            this.dealerActions(playerPoints)
          })
        }
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  };

  holdHand = () => {
    let nextPlayerNotBlackJack = nextNotBlackJack(this.state.playerIndexTurn, this.state.blackJackArr)
    if (nextPlayerNotBlackJack === this.state.playerIndexTurn) {
      this.setState({
        playerIndexTurn: -1
      }, () => {
        this.dealerActions(this.state.dealerHandPoints)
      });
    } else {
      this.setState({
        playerIndexTurn: nextPlayerNotBlackJack
      });
    }
  };

  dealerActions = (pointsForDealer) => {
    if (pointsForDealer < 16) {
      this.hitNext()
    } else {
      this.determineResultOfHand()
    }
  }

  determineResultOfHand = () => {
    let playerPtsCarried = this.state.playersGamePoints
    let newFlipCards = this.state.dealersCards.map(item => item = true)

    let dealerClosingPts = this.state.dealerHandPoints
    let playerClosingPts = this.state.playersHandPoints

    let winnersArr = playerClosingPts.map(item => item > dealerClosingPts ? 'winner' : item === dealerClosingPts ? 'tied' : 'loser')
    let playerPtsArr = winnersArr.map((item, key) => item === 'winner' ? 2 : item === 'tied' ? 1 : 0 + playerPtsCarried[key])

    let dealerUpdatedScore = this.state.dealerGamePoints + winnersArr.filter(item => item === 'loser').length * 2 + winnersArr.filter(item => item === 'tied').length

    this.setState({
      playersGamePoints: playerPtsArr,
      dealerGamePoints: dealerUpdatedScore,
      cardsFlippedArr: newFlipCards
    })
  }

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
        <ResultModal />
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
              <Dealer
                dealerCardsGame={this.state.dealersCards}
                cardsFlipArrGame={this.state.cardsFlippedArr}
              />
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
