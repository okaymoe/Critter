import './ProfUser.css';
import React from 'react'

const ProfUser = ({ userInfo }) => {
    return (
        <div className='profile-pic-zoom-img-container'>
            <img className='profile-pic-zoom-img' alt='' src={userInfo?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : userInfo?.profile_img} />
        </div>
    )
}

export default ProfUser
