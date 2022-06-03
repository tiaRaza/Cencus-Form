import React from 'react';
import "./Loader.css";

const Loader = props => {
    let { display } = props;

    return (
        <div className={`overlay ${display ? '' : 'hidden'}`}>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;