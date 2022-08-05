import './UsersCreets.css';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import { getUsers } from '../store/users';
import { authenticate } from '../store/session';

// import EditCreetModal from '../../Timeline/Creets/EditCreetModal';
// import { BiMessage } from 'react-icons/bi';
// import { FaRetweet } from 'react-icons/fa';
// import { FiHeart, FiShare } from 'react-icons/fi';
// import NumberOfComments from '../../Timeline/Comments/NumberOfComments/NumberOfComments';

const UsersCreets = ({ userId }) => {

    const [user, setUser] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams()
    const userObject = useSelector(state => state.user)
    console.log(userObject, "forkkkkkkkkk")

    // const sessionUser = useSelector(state => state.session.user);

    // const userInfo = usersArr[userId - 1]
    const creets = useSelector(state => state.creet);
    const creetsArr = Object.values(creets).reverse();
    const userCreets = creetsArr.filter(creet => creet.userId)
    const latestUserCreets = [];
    userCreets.forEach(creet => {
        latestUserCreets.unshift(creet);
    });

    //use singleCreet.user_id or singleCreet.profile_img etc.

    return (
        <div className="profile-creets-wrap">
            {creetsArr.map(singleCreet => {
                return (
                    <div className="profile-creets">
                        {sessionUser.id == singleCreet.user_id ? (
                            <div>
                                <img className='profile_creets-pic' alt='' src={singleCreet.joined.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : singleCreet.joined.profile_img} />
                                <div className='profile_creets_body'>
                            <div className="profile_creet-username-edit-profile">
                                <NavLink className="profile_creet_link_edit_to_text_decoration_none" to={`/creets/${singleCreet.id}`}>
                                    <div className="profile_creet-titles">
                                        <div className="feed-creet-display-name">{singleCreet.joined.name}</div>
                                        <div className="feed-creet-username">@{singleCreet.joined.username}<p className="stupid-dot">·</p></div>
                                        <div className="timestamp-container">
                                            <TimeAgo
                                                className="timestamp"
                                                date={singleCreet.created_at}
                                                locale='en-US'
                                                timestyle="twitter-first-minute"
                                            />
                                        </div>
                                    </div>
                                </NavLink>
                                {/* {creet.userId === userInfo.id &&
                                    <EditCreetModal creetId={creet.id} className="profile-page-creets-edit-btn" />
                                } */}
                            </div>
                            <div className="profile-feed-creet-container">
                                <NavLink className="creet-link" to={`/creets/${singleCreet.id}`}>
                                    <div id="profile-feed-creet">
                                        {singleCreet.content.split('\n').map(line => (<p className="profile-feed-creet-content-lines">{line}</p>))}
                                    </div>
                                    {singleCreet.image_url &&
                                        <div className='profile-feed-creet-img-container'>
                                            <img className='profile-feed-creet-img' src={singleCreet.image_url} alt='' />
                                        </div>
                                    }
                                </NavLink>
                            </div>
                            <NavLink className="creet-link" to={`/creets/${creets.id}`}>
                                <div className="profile-feed-creet-icons">
                                    <div className='profile-feed-creet-icon-and-stat'>
                                        {/* <BiMessage /> */}
                                        {/* <p className='profile-feed-creet-stat'><NumberOfComments creetId={creet.id} /></p> */}
                                    </div>
                                    
                                </div>
                            </NavLink>
                        </div>
                            </div>
                        ) : (
                            <></>
                        )
                        }
                    </div>
                )
            })}
        </div >

    )

}

export default UsersCreets