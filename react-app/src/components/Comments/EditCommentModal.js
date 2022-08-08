import "./EditCommentModal.css";
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from "./EditComment.js";
import EditIcon from '@mui/icons-material/Edit';

const EditCommentModal = ({ commentId }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="comment-edit-btn" onClick={() => setShowModal(true)}><EditIcon/></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment comment_id={commentId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal
