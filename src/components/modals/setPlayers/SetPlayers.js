import React from 'react'
import DefaultBtn from '../../buttons/DefaultBtn'
import './SetPlayers.css'

export default function SetPlayers(props) {

    let potentialNumberOfPlayers = ["1", "2", "3", "4", "5"]

    return (
        <div>
            <h3>Please select the number of players</h3>
            {potentialNumberOfPlayers.map((item, key) => (
                <DefaultBtn
                key={key}
                idParent={item}
                txtParent={item}
                callBackParent={props.numOfPlayersCallBackGame}
                />
            ))}
        </div>
    )
}
