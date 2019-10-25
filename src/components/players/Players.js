import React from 'react'
import Player from './player/Player'
import './Players.css'

export default function Players(props) {

    let numberOfPlayers = [1, 2, 3]

    return (
        <div>
            {numberOfPlayers.map((item, key) => (
                <Player
                key={key}
                playerIdPlayers={item}
                />
            ))}
        </div>
    )
}
