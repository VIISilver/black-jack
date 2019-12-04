import React from 'react'
import ResultData from './ResultData'
import DefaultBtn from '../../buttons/DefaultBtn'
import './ResultModal.css'

export default function ResultModal(props) {
    return (
        <div className='result-modal-wrap'>
            <p>Game Points Awarded</p>
            <div>
                {props.resultsGame.map((item, key) => (
                    <ResultData
                        key={key}
                        playerNameModal={key !== 0 ? `Player ${key}` : 'Dealer'}
                        resultPtsModal={item}
                    />
                ))}
            </div>
            <DefaultBtn
                callBackParent={props.nextHandGame}
                disableBoolParent={props.disableNextHandBtn}
                txtParent={'Next Hand'}
            />
        </div>
    )
}
