import React from 'react';
import "./Loader.css";
import "./Modal.css";

const ConfirmationModal = props => {
    let { title, display, message, hideModal, id, actionProceed } = props;

    const CloseHandler = e => {
        e.preventDefault();
        hideModal(id, false)
    }

    const ProceedAction = e => {
        e.preventDefault();
        CloseHandler(e);

        if(actionProceed) {
            actionProceed();
        }
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={ProceedAction}>Yes</button>
                            <button type="button" className="btn btn-danger" onClick={CloseHandler}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;