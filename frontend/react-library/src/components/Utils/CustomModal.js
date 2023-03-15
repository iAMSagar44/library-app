import React from 'react';

export const CustomModal = ({ title, show, onHide, onSave, action }) => {

    return (
        <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        Please confirm if you want to {action} the book today.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => onSave(action)}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
