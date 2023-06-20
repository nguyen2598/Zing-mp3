import React from 'react';
import './NoContentBox.scss';
export default function NoContentBox({ icon, text }) {
    return (
        <div className="no-content-box">
            <img src={icon} alt="" />
            <span className="no-content-text">{text}</span>
        </div>
    );
}
