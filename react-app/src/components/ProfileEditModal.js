import "./ProfileEditModal.css";
import React, { useState } from 'react'
import { Modal } from "../context/Modal";
import ProfileEdit from "./ProfileEdit";
import EditIcon from '@mui/icons-material/Edit';

const ProfileEditModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="profile-edit-btn" onClick={() => setShowModal(true)}><EditIcon id="editthisbutton"/></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ProfileEdit setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default ProfileEditModal
