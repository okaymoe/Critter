import "./EditCreets.css";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { eraseCreet, editingCreet } from "../../store/creets";
import { useHistory, useParams } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import ImageIcon from '@mui/icons-material/Image';

const EditCreets = ({ setShowModal, creet_id }) => {

    const allCreets = useSelector(state => state.creet);
    const editedCreet = allCreets[creet_id] || {};
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState(editedCreet.content);
    const [image, setImage] = useState(editedCreet.image_url);

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const removeImage = (e) => setImage(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const editCreet = {
            id: editedCreet.id,
            user_id: user.id,
            content,
            image_url: image
        }
        await dispatch(editingCreet(editCreet))
        setShowModal(false)
    }

    const deleteHandler = (e, creet) => {
        e.preventDefault();
        dispatch(eraseCreet(editedCreet))
        setShowModal(false)
        if (history.location.pathname === (`/users/${user.id}`)) {
            history.push(`/users/${user.id}`)
        } else { history.push("/") }
    }

    return (
        <div className="edit-creet-wrap">
            
            <div className="edit-creet-btn-and-title">
                <div className="edit-creet-top-left">
                    <div onClick={() => setShowModal(false)} className='edit-creet-close-btn-container'>
                        <ClearIcon className='edit-creet-close-btn' />
                    </div>
                    <h3 className="edit-creet-title">Edit Creet</h3>
                </div>
                <div className="edit-creet-top-right">
                    <div className="edit-creet-img-upload">
                        <div className={!image ? "edit-creet-img-upload-container" : "edit-creet-img-upload-container-off"}>
                            {!image &&
                                <label className="edit-creet-img-upload-label"><ImageIcon className="edit-creet-img-icon" />
                                    <input className="edit-creet-img-input" type="file" name="file"
                                        accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                </label>

                            }
                        </div>
                        {image &&
                            <div className="edit-creet-img-standby">
                                <div className="edit-creet-remove-img-btn-and-txt">
                                    <p className="edit-creet-remove-img-txt">Remove Image</p>
                                    <HighlightOffIcon className="edit-creet-img-delete-btn" onClick={removeImage} />
                                </div>
                                <p className="edit-creet-img-name">Uploading: {image.name}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="edit-creet-form">
                <div>
                    <textarea
                        className="edit-creet-input"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Let's edit this creet!"
                    />
                    {editedCreet.image_url &&
                        <div className='edit-creet-img-container'>
                            <img className='edit-creet-img' src={editedCreet.image_url} alt='' />
                        </div>
                    }
                </div>
                <div className="edit-and-delete-creet-btn">
                    <div className="edit-creet-progress-and-submit-btn">
                        <button disabled={(!content && !image) || content.length > 280} type="submit" className="submit-edit-creet-btn">Submit</button>
                        <div className="edit-creet-progress">
                            <span className={(content.length > 280 || (content.length === 0 && !image)) ? "edit-creet-char-total-red" : "edit-creet-char-total"}>{content.length}</span>
                            <p className="edit-creet-char-max">/280</p>
                        </div>
                    </div>
                    <div>
                        <button className="delete-creet-btn" onClick={(e) => deleteHandler(e, editedCreet)}>Delete</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCreets
