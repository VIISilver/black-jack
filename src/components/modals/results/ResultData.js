import React from 'react'
import './ResultData.css'

export default function ResultData(props) {
    return (
        <div className='result-data-wrap'>
            <input 
            className='result-data'
            value={props.playerNameModal}
            text={props.playerNameModal}
            readOnly
            />
            <input 
            className='result-data'
            value={props.resultPtsModal}
            text={props.resultPtsModal}
            readOnly
            />
        </div>
    )
}
