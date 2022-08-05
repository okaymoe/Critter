
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCreet } from "../store/creets";
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import './CreateCreet.css'




const CreateCreet = () => {

    const user = useSelector(state => state.session.user);
    console.log(user, "fuuuuuuuuck")
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [content, setContent] = useState('');

    const contentHandler = (e) => setContent(e.target.value);

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const removeImage = (e) => setImage(null);

    const reset = () => setContent('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCreet = {
            user_id: user.id,
            content,
            image_url: image
        }
        const creet = await dispatch(addCreet(newCreet))

        if (creet) {
            reset();
            removeImage();
        }
    }


    return (
        <div className="add-creet-wrap">
            <form className="addCreetForm" onSubmit={handleSubmit}>
                <div className="addCreet-sections">
                    <div className="addCreet-section1">
                        <img className='creet-profile-img-add' src={user.profile_img === '' ? 'https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg' : user.profile_img} alt="" />
                        <textarea
                            className="addCreet-input"
                            type="text"
                            value={content}
                            onChange={contentHandler}
                            placeholder="What's on your mind?"
                        />
                    </div>
                    <div className="addCreet-section2">
                        <div className="add-creet-img-upload">
                            <div className={!image ? "addCreet-upload-container" : "addCreet-upload-container-off"}>
                                {!image &&
                                    <label className="addCreet-label"><ImageIcon className="addCreet-icon" />
                                        <input className="creetBox__imageInput" type="file" name="file"
                                            accept="image/png, image/jpeg, image/jpg" onChange={updateImage} />
                                    </label>

                                }
                            </div>
                            {image &&
                                <div className="addCreet-imageStandby">
                                    <DeleteIcon className="addCreet-img-delete" onClick={removeImage} />
                                    <p className="addCreet-img-title">{image.name}</p>
                                </div>
                            }
                        </div>
                        <div className="addCreet-charcount">
                            <div className="addCreet-count">
                                <span className={(content.length > 280 || (!image && content.length === 0)) ? "addCreet-too-much" : "addCreet-280"}>{content.length}</span>
                                <p className="addCreet-280-maximum">/280</p>
                            </div>
                            <button disabled={(!content && !image) || content.length > 280} type="submit" className="addCreet-submit">Creet</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateCreet
