import './FactDisplay.css';
import React from 'react'
import { Facts } from './Facts';

const FactDisplay = () => {
    return (
        <div className='facts-wrap'>
            <div className='facts-container'>
                <h3 className='facts-title'>Fun Fact!</h3>
                <p className='facts-content'>
                    {Facts[Math.floor(Math.random() * Facts.length)]}
                </p>
            </div>
        </div>
    )
}

export default FactDisplay
