import "./Creets.css";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import TimeAgo from 'react-timeago'
import EditCreets from "./EditCreets";


const Creets = ({userId, creetId}) => {

    const users = useSelector(state => state.user);
    const sessionUser = useSelector(state => state.session?.user);
    const creets = useSelector(state => state.creet);
    const creetsArr = Object.values(creets);
    const latestCreets = creetsArr.reverse();

    return (
        <div className="creets-wrap">
            {latestCreets?.map(creet => {
                return (
                    <div key={creet.id} className="creets">
                        <NavLink className="all-creets-profile-pic-link" to={`/users/${creet.user_id}`}>
                            <img className='all-creets-profile-pic' src={users[creet.user_id]?.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : users[creet.user_id]?.profile_img} alt='' />
                        </NavLink>
                        <div className="all-creets-everything-minus-pic">
                            <div className="feed-creet-names-edit-and-content">
                                <div className="feed-creet-username-and-edit-btn">
                                    <NavLink className="creet-link" to={`/creets/${creet.id}`}>
                                        <div className="feed-creet-names">
                                            <div className="feed-creet-display-name">{users[creet.user_id]?.name}</div>
                                            <div className="feed-creet-username">@{users[creet.user_id]?.username}<p className="stupid-dot">·</p></div>
                                            <div className="timestamp-container">
                                                <TimeAgo
                                                    className="timestamp"
                                                    date={creet.created_at}
                                                    locale='en-US'
                                                    timeStyle="twitter-first-minute"
                                                />
                                            </div>
                                        </div>
                                    </NavLink>
                                    {creet.user_id === sessionUser.id && 
                                        <EditCreets creet_id={creetId} className="all-creets-edit-btn" />
                                    }
                                </div>
                                <div className="feed-creet-container">
                                    <NavLink className="creet-link" to={`/creets/${creet.id}`}>
                                        <div className="feed-creet">
                                            {creet.content.split('\n').map(line => (<div key={line.id} id={creet.id} className="feed-creet-content-lines">{line}</div>))}
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                            <NavLink className="creet-link" to={`/creets/${creet.id}`}>
                                <div className="feed-creet-icons">
                                    <div className='feed-creet-icon-and-stat'>
                                        <AddCommentIcon />
                                        <p className='feed-creet-stat'>
                                            {/* <NumberOfComments creetId={creet.id} /> */}
                                        </p>
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

export default Creets
