import React from 'react'
import Card from './card/Card'
import './Cards.css'

export default function Cards() {

    let cardArr = ['https://deckofcardsapi.com/static/img/JS.png', 'https://deckofcardsapi.com/static/img/JS.png', 'https://deckofcardsapi.com/static/img/JS.png',]

    return (
        <div>
            {cardArr.map((item, key) => (
                <Card
                key={key}
                imgSrcCards={item}
                />
            ))}
        </div>
    )
}
