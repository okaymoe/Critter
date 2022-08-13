import './OneComment.css'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import EditCommentModal from './EditCommentModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';

const OneComment = () => {

    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.user);
    const { commentId } = useParams();
    const comment = useSelector(state => state?.comment[commentId]);

    return (
        <div className='single-comment-wrap'>
            <div className='comment-and-back-button'>
                <Link className='comment-back-link' to={`/creets/${comment.creet_id.id}`}>
                    <div className='single-comment-back-btn-container'>
                        <ArrowBackIcon className='single-comment-back-button' />
                    </div>
                </Link>
                <h2 className='comment'>Reply</h2>
            </div>
            <div className="single-comment-block">
                <div className='single-comment-pic-names-and-edit'>
                    <div className='single-comment-pic-and-names'>
                        <Link className="single-comment-profile-pic-link" to={`/users/${comment?.user_id}`}>
                            <img className='single-comment-profile-pic' src={users[comment.user_id]?.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : users[comment.user_id]?.profile_img} alt="" />
                        </Link>
                        <div className='single-comment-names'>
                            <p className='single-comment-display-name'>{users[comment.user_id]?.name}</p>
                            <p className='single-comment-username'>@{users[comment.user_id]?.username}</p>
                        </div>
                    </div>
                    <div className="single-comment-edit-btn">
                        {
                            comment.creet_id.user_id === sessionUser.id &&
                            <EditCommentModal commentId={commentId} />
                        }
                    </div>
                </div>
                <div className="single-comment-container">
                    <div className="single-comment">
                        {comment.content.split('\n').map(line => (<p className="single-comment-content-lines">{line}</p>))}
                    </div>
                </div>
                {comment.image_url &&
                    <div className='single-comment-img-container'>
                        <img className='single-comment-img' src={comment.image_url} alt='' />
                    </div>
                }
                <div className='single-comment-timestamp'>{moment(comment?.created_at).format('LT')}  ·  {moment(comment?.created_at).format('ll')}</div>
            </div>
        </div>
    )
}

export default OneComment
