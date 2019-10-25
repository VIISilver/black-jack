import React from 'react'
import Card from './card/Card'
import './Cards.css'

export default function Cards(props) {

    let cardArr = props.isDealer ? props.dealerCardsDealer : props.playersCardsIndividual
    let cardFlipped = [false, true, true, true]

    return (
        <div>
            {cardArr.map((item, key) => (
                <Card
                key={key}
                imgSrcCards={item.image}
                flippedCards={props.isDealer ? cardFlipped[key] : true}
                />
            ))}
        </div>
    )
}
