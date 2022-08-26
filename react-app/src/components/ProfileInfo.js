import './ProfileInfo.css';
import React, { useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { Modal } from '../context/Modal';
import { ProfileImgModal } from './ProfileImgModal';
import ProfUser from './ProfUser';
import ProfileEditModal from './ProfileEditModal';

const ProfileInfo = ({ userId }) => {

    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser)
    const users = useSelector(state => state.user);
    const userInfo = users[userId]
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showHeaderModal, setShowHeaderModal] = useState(false);

    return (
        <div className='profile-header-wrap'>
            <div className='profile-header-pic-and-profile-pic'>
                <div className='profile-header-container'>
                    <img onClick={() => setShowHeaderModal(true)} className='profile-header' alt='' src={userInfo?.header_img === '' ? 'https://wsbu.files.wordpress.com/2014/09/light-blue-background-top-header-1024x320.jpg?w=640' : userInfo?.header_img} />
                </div>
                <div className='profile-prof-pic-and-edit-btn'>
                    <img onClick={() => setShowProfileModal(true)} className='profile-prof-pic' alt='' src={userInfo?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : userInfo?.profile_img} />
                    {showProfileModal && (
                        <ProfileImgModal onClose={() => setShowProfileModal(false)}>
                            <ProfUser className="profile-pic-zoom-modal" userInfo={userInfo} setShowModal={setShowProfileModal} />
                        </ProfileImgModal>
                    )}
                    <div className='profile-edit-profile-btn-div'>
                        {sessionUser.id === Number(userId) && <ProfileEditModal />}
                    </div>
                </div>
            </div>
            <div className='profile-info'>

                <div className='profile-names'>
                    <p className='profile-display-name'>{userInfo?.name}</p>
                    <p className='profile-username'>@{userInfo?.username}</p>
                </div>
                <div className='profile-stats'>
                    <p className='profile-bio'>
                        {userInfo?.bio}
                    </p>
                    <div className='profile-stat-and-icon'>
                        <LocationOnIcon className='profile-icons' />
                        <p className='profile-location'>{userInfo.location}</p>
                    </div>
                    <div className='profile-stat-and-icon'>
                        <CakeIcon className='profile-icons' />
                        <p className='profile-birthday'>Born {moment(userInfo?.birthday).format('MMMM Do YYYY')}</p>
                    </div>
                    <div className='profile-stat-and-icon'>
                        <PermContactCalendarIcon className='profile-icons' />
                        <p className='profile-joined'>Joined {moment(userInfo?.joined).format('MMMM YYYY')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
