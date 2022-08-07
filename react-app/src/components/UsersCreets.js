import './UsersCreets.css';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { getUsers } from '../store/users';
import { authenticate } from '../store/session';
import EditCreetModal from './Creets/EditCreetModal';

// import EditCreetModal from '../../Timeline/Creets/EditCreetModal';
// import { BiMessage } from 'react-icons/bi';
// import { FaRetweet } from 'react-icons/fa';
// import { FiHeart, FiShare } from 'react-icons/fi';
// import NumberOfComments from '../../Timeline/Comments/NumberOfComments/NumberOfComments';

const UsersCreets = ({ userId }) => {

    const users = useSelector(state => state.user); //good 
    const usersArr = Object.values(users); // good
    const userInfo = usersArr[userId - 1] // good
    const creets = useSelector(state => state.creet);
    const creetsArr = Object.values(creets);
    const userCreets = creetsArr.filter(creet => creet.user_id === Number(userId))
    const latestUserCreets = [];
    userCreets.forEach(creet => {
        latestUserCreets.unshift(creet);
    });

    return (
        <div className="profile-creets-wrap">
            {latestUserCreets?.map(creet => {
                return (
                    <div key={creet.id} className="profile-creets">
                        <img className='profile-creets-profile-pic' alt='' src={userInfo?.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : userInfo?.profile_img} />
                        <div className='profile-creets-everything-minus-pic'>
                            <div className="profile-feed-creet-username-and-edit-btn">
                                <NavLink className="profile-creet-link" to={`/creets/${creet.id}`}>
                                    <div className="profile-feed-creet-names">
                                        <div className="feed-creet-display-name">{userInfo?.name}</div>
                                        <div className="feed-creet-username">@{userInfo?.username}<p className="dot">·</p></div>
                                        <div className="timestamp-container">
                                            <TimeAgo
                                                className="timestamp"
                                                date={creet.created_at}
                                                locale='en-US'
                                                timestyle="twitter-first-minute"
                                            />
                                        </div>
                                    </div>
                                </NavLink>
                                {creet.user_id === userInfo.id &&
                                    <EditCreetModal creetId={creet.id} className="profile-page-creets-edit-btn" />
                                }
                            </div>
                            <div className="profile-feed-creet-container">
                                <NavLink className="creet-link" to={`/creets/${creet.id}`}>
                                    <div className="profile-feed-creet">
                                        {creet.content.split('\n').map(line => (<p className="profile-feed-creet-content-lines">{line}</p>))}
                                    </div>
                                    {creet.image_url &&
                                        <div className='profile-feed-creet-img-container'>
                                            <img className='profile-feed-creet-img' src={creet.image_url} alt='' />
                                        </div>
                                    }
                                </NavLink>
                            </div>
                            <NavLink className="creet-link" to={`/creets/${creet.id}`}>
                                <div className="profile-feed-creet-icons">
                                    <div className='profile-feed-creet-icon-and-stat'>
                                        <AddCommentIcon />
                                        {/* <p className='profile-feed-creet-stat'><NumberOfComments creetId={creet.id} /></p> */}
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                )
            })}
        </div >
    )

}

export default UsersCreets