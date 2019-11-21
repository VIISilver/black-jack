import React from 'react'
import './ResultModal.css'

export default function ResultModal(props) {
    return (
        <div className='result-modal-wrap'>
            {/* <p>Game Points Awarded are Detailed below:</p> */}
            <p>Game Points Awarded</p>
            <p>{props.resultsGame}</p>
        </div>
    )
}
