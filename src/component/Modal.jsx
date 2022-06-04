import React, { useState } from 'react';
import "./Loader.css";
import "./Modal.css";

const Modal = props => {
    let { title, display, message, hideModal, id } = props;

    const CloseHandler = e => {
        e.preventDefault();
        hideModal(id, false)
    }

    return (
        <div className={`overlay ${display ? '' : 'hidden'}`}>
            <div className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button onClick={CloseHandler} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;