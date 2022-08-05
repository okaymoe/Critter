// import './EditCreetModal.css';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCreets from './EditCreets';

const EditCreetModal = ({ creetId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="creet-edit-btn" onClick={() => setShowModal(true)}>Edit Creet</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCreets creet_id={creetId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditCreetModal
