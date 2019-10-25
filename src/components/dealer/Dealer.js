import React from 'react'
import Cards from '../cards/Cards'
import './Dealer.css'

export default function Dealer(props) {
    return (
        <div>
            <h3>Dealer</h3>
            <Cards
            isDealer={true}
            dealerCardsDealer={props.dealerCardsGame}
             />
        </div>
    )
}
