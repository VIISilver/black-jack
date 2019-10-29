import React from 'react'
import Cards from '../../cards/Cards'
import DefaultBtn from '../../buttons/DefaultBtn'
import './Player.css'

export default function Player(props) {
    return (
        <div className='individual-player'>
            <h3>Player {props.playerIdPlayers}</h3>
            <Cards
            playersCardsIndividual={props.playersCardsPlayers}
            />
            <DefaultBtn
            txtParent={'Hit'}
            callBackParent={props.hitNextPlayers}
            />
        </div>
    )
}
