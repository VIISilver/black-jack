import React from 'react'
import Player from './player/Player'
import './Players.css'

export default function Players(props) {

    let numberOfPlayers = Array.from(Array(props.numPlayersGame).keys()).map(item => +item + 1)

    return (
        <div>
            {numberOfPlayers.map((item, key) => (
                <Player
                key={key}
                playerIdPlayers={item}
                playersCardsPlayers={props.playersCardsGame}
                />
            ))}
        </div>
    )
}
