import React from 'react'
import Cards from '../cards/Cards'
import './Dealer.css'

export default function Dealer(props) {
    return (
        <div className='dealer-wrap'>
            <h3>Dealer</h3>
            <p>Points = {props.pointsGameDealer}</p>
            <Cards
                isDealer={true}
                dealerCardsDealer={props.dealerCardsGame}
                cardsFlipArrDealer={props.cardsFlipArrGame}
            />
        </div>
    )
}
