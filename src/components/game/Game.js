import React, { Component } from 'react'
import Dealer from '../dealer/Dealer'
import Players from '../players/Players'
import './Game.css'

export default class Game extends Component {
    render() {
        return (
            <div>
                <h1>Black Jack</h1>
                <Dealer />
                <Players />
            </div>
        )
    }
}
