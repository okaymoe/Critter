import './SidebarCreetModal.css';
import React, { useState } from 'react'
import SidebarCreet from './SidebarCreet';
import { Modal } from '../../context/Modal';

const SidebarCreetModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="sidebar-creet-modal-main-btn" onClick={() => setShowModal(true)}>Creet</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SidebarCreet setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default SidebarCreetModal