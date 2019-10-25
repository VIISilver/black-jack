import React, { Fragment } from 'react'
import './Card.css'

export default function Card(props) {
    return (
        <Fragment>
            <img className='individual-card' src={props.imgSrcCards} />
        </Fragment>
    )
}
