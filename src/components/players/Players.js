import React from 'react'
import Player from './player/Player'
import './Players.css'

export default function Players(props) {

    return (
        <div>
            {props.playersCardsGame.map((item, key) => (
                <Player
                key={key}
                playerIdPlayers={key + 1}
                playersCardsPlayers={item}
                hitNextPlayers={props.hitNextGame}
                holdHandPlayers={props.holdHandGame}
                playerBlackJackBoolPlayers={props.playersBlackJackBoolArrGame[key]}
                playersTurnIndexPlayers={props.playersTurnIndexGame}
                playerPointsPlayers={props.playerPointsGame[key]}
                />
            ))}
        </div>
    )
}
