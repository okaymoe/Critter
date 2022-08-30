import './OtherUsers.css';
import React from 'react'
import ChooseUser from './ChooseUser';

const OtherUsers = () => {

    return (
        <div className='community-wrap'>
            <div className='community-container'>
            <h3 className='community-title'>Who to check out</h3>
                <div className='community-content'>
                    <ChooseUser />
                </div>
            </div>
        </div>
    )
}

export default OtherUsers
