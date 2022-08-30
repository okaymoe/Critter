import './ProfileEdit.css';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editingUsers } from '../store/users';
import CancelIcon from '@mui/icons-material/Cancel';
// import UploadPicture from '../../../ImageUpload/UploadPicture';
// import { useParams } from "react-router-dom";

const ProfileEdit = ({ setShowModal }) => {

    const [errors, setErrors] = useState([]);
    const users = useSelector(state => state.user)
    const userId = useSelector(state => state.session.user.id);
    const user = users[userId]
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    let [header_img, setHeader_img] = useState(user.header_img);
    let [profile_img, setProfile_img] = useState(user.profile_pic);
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [location, setLocation] = useState(user.location);
    const [birthday, setBirthday] = useState(new Date(user.birthday) || new Date());
    const dispatch = useDispatch();
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000)

    const onSubmit = async (e) => {
        e.preventDefault();

        const editingUser = {
            id: user.id,
            bio,
            birthday: birthday?.toISOString().split('T')[0],
            name: name,
            email,
            header_img,
            location,
            profile_img: profile_img,
            username
        }

        const data = await dispatch(editingUsers(editingUser))
        if (data) {
            setErrors(data)
        } else {
            setShowModal(false)
        }
    }

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updateHeaderImg = (e) => {
        const file = e.target.files[0];
        setHeader_img(file);
    };

    const updateProfile_img = (e) => {
        const file = e.target.files[0];
        setProfile_img(file);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };

    const updateBio = (e) => {
        setBio(e.target.value);
    };

    const updateLocation = (e) => {
        setLocation(e.target.value);
    };

    const updateBirthday = (e) => {
        if (e.target.value) {
            setBirthday(new Date(e.target.value));
        }
    };

    return (
        <div className='edit-profile-wrap'>
            <div className='edit-profile-header'>
                <div className='edit-profile-btn-and-title'>
                    <div onClick={() => setShowModal(false)} className='edit-close-btn-container'>
                        <CancelIcon className='edit-close-btn' />
                    </div>
                    <p className='edit-title-txt'>Edit profile</p>
                </div>
                <button onClick={onSubmit} type='submit' className='edit-profile-sumbit-btn'>Save</button>
            </div>
            <form className='edit-profile-form'>
                {/* <div>
                    {errors?.map((error, ind) => (
                        <div className='edit-profile-errors' key={ind}>{error}</div>
                    ))}
                </div> */}
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Name</label>
                    <input
                        className='edit-profile-input'
                        type="text"
                        name='name'
                        onChange={updateName}
                        value={name}
                        required
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Username</label>
                    <input
                        className='edit-profile-input'
                        type="text"
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        required
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Email</label>
                    <input
                        className='edit-profile-input'
                        type="text"
                        name='email'
                        onChange={updateEmail}
                        value={email}
                        required
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Header URL</label>
                    <input
                        className='edit-profile-input'
                        type="file"
                        name='header'
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={updateHeaderImg}
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Profile Picture URL</label>
                    <input
                        className='edit-profile-input'
                        type="file"
                        name='profile-pic'
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={updateProfile_img}
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Bio</label>
                    <textarea
                        className='edit-profile-input'
                        type="text"
                        name='bio'
                        onChange={updateBio}
                        value={bio}
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Location</label>
                    <input
                        className='edit-profile-input'
                        type="text"
                        name='location'
                        onChange={updateLocation}
                        value={location}
                    />
                </div>
                <div className='edit-profile-field-container'>
                    <label className='edit-label'>Birthday</label>
                    <input
                        className='edit-profile-birthday-input'
                        type="date"
                        name='birthday'
                        max={yesterday.toISOString().split('T')[0]}
                        value={birthday?.toISOString().split('T')[0]}
                        onChange={updateBirthday}
                    />
                </div>
            </form>
        </div>
    )
}

export default ProfileEdit
