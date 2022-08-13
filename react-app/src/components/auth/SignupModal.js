import './SignupModal.css';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from '../auth/SignUpForm';

const SplashSignupModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="splash-signup-btn" onClick={() => setShowModal(true)}>Sign up to be a Critter</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default SplashSignupModal