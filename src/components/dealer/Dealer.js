import React from 'react'
import Cards from '../cards/Cards'
import './Dealer.css'

export default function Dealer(props) {
    return (
        <div className='dealer-wrap'>
            <h3>Dealer<span style={{display: props.dealerBlackJackBoolGame ? "inline-block" : "none"}}>&nbsp;got a BlackJack!!!</span></h3>
            <Cards
            isDealer={true}
            dealerCardsDealer={props.dealerCardsGame}
             />
        </div>
    )
}
