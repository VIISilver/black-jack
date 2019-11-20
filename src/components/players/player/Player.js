import React from 'react'
import Cards from '../../cards/Cards'
import DefaultBtn from '../../buttons/DefaultBtn'
import './Player.css'

export default function Player(props) {
    return (
        <div className='individual-player'>
            <h3>Player {props.playerIdPlayers} <br/><br/> Points = {props.playerPointsPlayers}<span style={{display: props.playerBlackJackBoolPlayers ? "inline-block" : "none"}}>&nbsp;got a BlackJack!!!</span></h3>
            <Cards
            playersCardsIndividual={props.playersCardsPlayers}
            />
            <DefaultBtn
            txtParent={'Hit'}
            callBackParent={props.hitNextPlayers}
            disableBoolParent={!(props.playersTurnIndexPlayers === props.playerIdPlayers - 1)}
            />
            <DefaultBtn
            txtParent={'Hold'}
            callBackParent={props.holdHandPlayers}
            disableBoolParent={!(props.playersTurnIndexPlayers === props.playerIdPlayers - 1)}
            />
        </div>
    )
}
