import "./ChooseUser.css"
import React from 'react'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const ChooseUser = () => {

    const users = useSelector(state => state.user);
    const sessionUser = useSelector(state => state.session.user);
    const usersArr = Object.values(users);
    const otherUsers = usersArr.filter(user => user.id !== sessionUser.id)
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)]
    return (
        <div className="random-user-wrap">
            <div className="random-user-pfp-and-names">
                <img className="profile-pic" alt="" src={randomUser?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : randomUser?.profile_img} />
                <div className="random-user-names">
                    <p className="random-user-display-name">{randomUser.name}</p>
                    <p className="random-user-username">@{randomUser.username}</p>
                </div>
            </div>
            <Link className="random-user-link" to={`/users/${randomUser.id}`}>
                <button className="random-user-view-btn">
                    <p className="random-user-view-txt">View profile</p>
                </button>
            </Link>
        </div>
    )
}

export default ChooseUser
