import './ProfileImgModal.css';
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = React.createContext();

export function ProfileImgModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();


    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function ProfileImgModal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="profile-pic-modal">
            <div id="profile-pic-modal-background" onClick={onClose}></div>
            <div id="profile-pic-modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}
