import "./EditComment.css";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { eraseComment, editingComment } from "../../store/comments";
import ClearIcon from '@mui/icons-material/Clear';
import ImageIcon from '@mui/icons-material/Image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const EditComment = ({ setShowModal, comment_id }) => {

    const allComments = useSelector(state => state.comment);
    const editedComment = allComments[comment_id] || {};
    const creetId = editedComment?.creet?.id
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState(editedComment.content);
    const [image, setImage] = useState(editedComment.image_url);

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const removeImage = (e) => setImage(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editingComment = {
            id: editedComment.id,
            user_id: user.id,
            creet_id: creetId,
            content,
            image_url: image
        }
        await dispatch(editingComment(editingComment))
        setShowModal(false)
    }

    const deleteHandler = (e, comment) => {
        e.preventDefault();
        dispatch(eraseComment(editedComment))
        history.push(`/creets/${creetId}`)
    }

    return (
        <div className="edit-comment-wrap">
            <div className="edit-comment-btn-and-title">
                <div className="edit-comment-top-left">
                    <div onClick={() => setShowModal(false)} className='edit-comment-close-btn-container'>
                        <ClearIcon className='edit-comment-close-btn' />
                    </div>
                    <h3 className="edit-comment-title">Edit reply</h3>
                </div>
                <div className="edit-comment-top-right">
                    <div className="edit-comment-img-upload">
                        <div className={!image ? "edit-comment-img-upload-container" : "edit-comment-img-upload-container-off"}>
                            {!image &&
                                <label className="edit-comment-img-upload-label"><ImageIcon className="edit-comment-img-icon" />
                                    <input className="edit-comment-img-input" type="file" name="file"
                                        accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                </label>
                            }
                        </div>
                        {image &&
                            <div className="edit-comment-img-standby">
                                <div className="edit-comment-remove-img-btn-and-txt">
                                    <p className="edit-comment-remove-img-txt">Remove Image</p>
                                    <HighlightOffIcon className="edit-comment-img-delete-btn" onClick={removeImage} />
                                </div>
                                <p className="edit-comment-img-name">Uploading: {image.name}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="edit-comment-form">
                <div>
                    <textarea
                        className="edit-comment-input"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind? This is a safe space."
                    />
                    {editedComment.image_url &&
                        <div className='edit-comment-img-container'>
                            <img className='edit-comment-img' src={editedComment.image_url} alt='' />
                        </div>
                    }
                </div>
                <div className="edit-and-delete-comment-btn">
                    <div className="edit-comment-progress-and-submit-btn">
                        <button disabled={(!content && !image) || content.length > 280} type="submit" className="submit-edit-comment-btn">Submit</button>
                        <div className="edit-comment-progress">
                            <span className={(content.length > 280 || (content.length === 0 && !image)) ? "edit-comment-char-total-red" : "edit-comment-char-total"}>{content.length}</span>
                            <p className="edit-comment-char-max">/280</p>
                        </div>
                    </div>
                    <div>
                        <button className="delete-comment-btn" onClick={(e) => deleteHandler(e, editedComment)}>Delete</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditComment