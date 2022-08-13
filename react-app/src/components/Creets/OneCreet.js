import './OneCreet.css';
import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import CreateComment from '../Comments/CreateComment';
import EditCreetModal from './EditCreetModal';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';

const OneCreet = () => {

    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.user);
    const { creetId } = useParams();
    const creet = useSelector(state => state?.creet[creetId]);
    const comments = useSelector(state => state.comment);
    const commentsArr = Object.values(comments);
    const creetComments = commentsArr.filter(comment => Number(comment.creet_id.id) === Number(creetId));

    return (
        <div className='creet-comment-wrap'>
            <div className='thread-and-back-button'>
                <NavLink className='thread-back-link' to={"/"}>
                    <div className='single-creet-back-btn-container'>
                        <ArrowBackIcon className='single-creet-back-button' />
                    </div>
                </NavLink>
            </div>
            <div className="single-creet-block">
                <div className='single-creet-pic-names-and-edit'>
                    <div className='single-creet-pic-and-names'>
                        <img className='single-creet-profile-pic' src={users[creet.user_id]?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : users[creet.user_id]?.profile_img} alt="" />
                        <div className='single-creet-names'>
                            <p className='single-creet-display-name'>{users[creet.user_id]?.name}</p>
                            <p className='single-creet-username'>@{users[creet.user_id]?.username}</p>
                        </div>
                    </div>
                    <div className="single-creet-edit-btn">
                        {
                            creet.user_id === sessionUser.id &&
                            <EditCreetModal creetId={creetId} />
                        }
                    </div>
                </div>
                <div className="single-creet-container">
                    <div className="single-creet">
                        {creet.content.split('\n').map(line => (<p className="single-creet-content-lines">{line}</p>))}
                    </div>
                </div>
                {creet.image_url &&
                    <div className='single-creet-img-container'>
                        <img className='single-creet-img' src={creet.image_url} alt='' />
                    </div>
                }
                <div className='single-creet-timestamp'>{moment(creet?.created_at).format('LT')}  ·  {moment(creet?.created_at).format('ll')}</div>
                <div className='single-creet-icons'>
                    <div className='single-creet-icon-and-stat'>
                        <AddCommentIcon />
                        <p className='single-creet-icon-info'>{creetComments.length}</p>
                    </div>
                </div>
            </div>
            <CreateComment />
            <div className="all-comments-wrap">
                <Comments />
            </div>
        </div>
    )
}

export default OneCreet
