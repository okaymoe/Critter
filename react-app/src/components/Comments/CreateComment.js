import "./CreateComment.css";
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { addComment } from "../../store/comments";
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';

const CreateComment = () => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { creetId } = useParams();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const contentHandler = (e) => {
        setContent(e.target.value)
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const removeImage = (e) => setImage(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            user_id: user.id,
            creet_id: creetId,
            content,
            image_url: image
        }

        const comment = await dispatch(addComment(newComment))

        if (comment) {
            reset();
            removeImage();
        }
    }

    const reset = () => {
        setContent('');
    }

    return (
        <div className="add-comment-wrap">
            <form onSubmit={handleSubmit} className="add-comment-form">
                <img className='add-comment-profile-pic' alt='' src={user.profile_img === '' ? 'https://i.pinimg.com/originals/be/8d/27/be8d2760940422c69bb64e2833f012ed.jpg' : user.profile_img} />
                <div className="add-comment-both-halves">
                    <div className="add-comment-first-half">
                        <textarea
                            className="add-comment-input"
                            type="text"
                            value={content}
                            onChange={contentHandler}
                            placeholder="Creet your reply."
                        />
                    </div>
                    <div className="add-comment-second-half">
                        <div className="add-comment-img-upload">
                            <div className={!image ? "add-comment-img-upload-container" : "add-comment-img-upload-container-off"}>
                                {!image &&
                                    <label className="add-comment-img-upload-label"><ImageIcon className="add-comment-img-icon" />
                                        <input className="add-comment-img-input" type="file" name="file"
                                            accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                    </label>

                                }
                            </div>
                            {image &&
                                <div className="add-comment-img-standby">
                                    <CancelIcon className="add-comment-img-delete-btn" onClick={removeImage} />
                                    <p className="add-comment-img-name">{image.name}</p>
                                </div>
                            }
                        </div>
                        <div className="add-comment-progress-and-button">
                            <div className="add-comment-progress">
                                <span className={(content.length > 280 || (!image && content.length === 0)) ? "add-comment-char-total-red" : "add-comment-char-total"}>{content.length}</span>
                                <p className="add-comment-char-max">/280</p>
                            </div>
                            <button disabled={(!content && !image) || content.length > 280} type="submit" className="add-comment-btn">Reply</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateComment
