import './ProfUser.css';
import React from 'react'

const ProfUser = ({ userInfo }) => {
    return (
        <div className='profile-pic-zoom-img-container'>
            <img className='profile-pic-zoom-img' alt='' src={userInfo?.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : userInfo?.profile_img} />
        </div>
    )
}

export default ProfUser
