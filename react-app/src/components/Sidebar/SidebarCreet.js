import './SidebarCreet.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCreet } from "../../store/creets";
import ImageIcon from '@mui/icons-material/Image';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SidebarCreet = ({ setShowModal }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');

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
        const newCreet = {
            user_id: user.id,
            content,
            image_url: image
        }

        const creet = await dispatch(addCreet(newCreet))

        if (creet) reset();
    }

    const reset = () => {
        setContent('');
        setShowModal(false);
    }

    return (
        <div className="sidebar-add-creet-wrap">
            <div className='sidebar-add-creet-close-btn-and-title'>
                <div onClick={() => setShowModal(false)} className='sidebar-add-creet-close-btn-container'>
                    <CancelIcon className='sidebar-add-creet-close-btn' />
                </div>
                <p className='sidebar-add-creet-title'>Create a Creet</p>
            </div>
            <form onSubmit={handleSubmit} className="sidebar-add-creet-form">
                <img className='sidebar-add-creet-profile-pic' src={user.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : user.profile_img} alt="" />
                <div className="sidebar-add-creet-both-halves">
                    <div className="sidebar-add-creet-first-half">
                        <textarea
                            className="sidebar-add-creet-input"
                            type="text"
                            value={content}
                            onChange={contentHandler}
                            placeholder="What's on your mind? This is a safe space."
                        />
                    </div>
                    <div className="sidebar-add-creet-second-half">
                        <div className="sidebar-add-creet-img-upload">
                            <div className={!image ? "sidebar-add-creet-img-upload-container" : "sidebar-add-creet-img-upload-container-off"}>
                                {!image &&
                                    <label className="sidebar-add-creet-img-upload-label"><ImageIcon className="sidebar-add-creet-img-icon" />
                                        <input className="sidebar-add-creet-img-input" type="file" name="file"
                                            accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                    </label>

                                }
                            </div>
                            {image &&
                                <div className="sidebar-add-creet-img-standby">
                                    <HighlightOffIcon className="sidebar-add-creet-img-delete-btn" onClick={removeImage} />
                                    <p className="sidebar-add-creet-img-name">{image.name}</p>
                                </div>
                            }
                        </div>
                        <div className="sidebar-add-creet-progress-and-button">
                            <div className="sidebar-add-creet-progress">
                                <span className={(content.length > 280 || (!image && content.length === 0)) ? "sidebar-add-creet-char-total-red" : "sidebar-add-creet-char-total"}>{content.length}</span>
                                <p className="sidebar-add-creet-char-max">/280</p>
                            </div>
                            <button disabled={(!content && !image) || content.length > 280} type="submit" className="sidebar-add-creet-btn">Creet</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SidebarCreet;

