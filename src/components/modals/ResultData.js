import React from 'react'
import './ResultData.css'

export default function ResultData(props) {
    return (
        <div className='result-data-wrap'>
            <p className='result-data'>{props.playerNameModal}</p>
            <p className='result-data'>{props.resultPtsModal}</p>
        </div>
    )
}
