import "./Comments.css";
import React from 'react'
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import EditCommentModal from "./EditCommentModal";
import TimeAgo from 'react-timeago'

const Comments = () => {

    const { creetId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.user);
    const comments = useSelector(state => state.comment);
    const commentsArr = Object.values(comments)
    const creetComments = commentsArr.filter(comment => Number(comment.creet_id.id) === Number(creetId))


    return (
        <div className="comments-wrap">
            {creetComments?.map(comment => {
                return (
                    <div key={comment.id} className="comments">
                        <Link className="all-comments-profile-pic-link" to={`/users/${comment.user_id}`}>
                            <img className='all-comments-profile-pic' src={users[comment.user_id]?.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : users[comment.user_id]?.profile_img} alt="" />
                        </Link>
                        <div className="all-comments-everything-minus-pic">
                            <div className="feed-comment-names-edit-and-content">
                                <div className="feed-comment-username-and-edit-btn">
                                    <Link className="comment-link" to={`/comments/${comment.id}`}>
                                        <div className="feed-comment-names">
                                            <p className="feed-comment-display-name">{users[comment.user_id]?.name}</p>
                                            <p className="feed-comment-username">@{users[comment.user_id]?.username}<div className="stupid-dot">·</div></p>
                                            <p className="timestamp-container">
                                                <TimeAgo
                                                    className="timestamp"
                                                    date={comment.created_at}
                                                    locale='en-US'
                                                    timestyle="twitter-first-minute"
                                                />
                                            </p>
                                        </div>
                                    </Link>
                                    {/* {comment.user_id === sessionUser.id &&
                                        <EditCommentModal commentId={comment.id} className="all-comments-edit-btn" />
                                    } */}
                                </div>
                                <div className="feed-comment-container">
                                    <Link className="comment-link" to={`/comments/${comment.id}`}>
                                        <div className="feed-comment">
                                            {comment.content.split('\n').map(line => (<p className="feed-comment-content-lines">{line}</p>))}
                                        </div>
                                        {comment.image_url &&
                                            <div className='feed-comment-img-container'>
                                                <img className='feed-comment-img' src={comment.image_url} alt='' />
                                            </div>
                                        }
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

export default Comments
