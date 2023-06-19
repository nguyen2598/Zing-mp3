import React from 'react';
import './MV.scss';
export default function MV({ img1, img2, title, author, time }) {
    return (
        <div className="mv">
            <div className="img-pry">
                <img src={img1} alt="" />
                <div className="time">{time}</div>
            </div>
            <div className="mv-content">
                <div className="img-content">
                    <img src={img2} alt="" />
                </div>
                <div className="mv-title">
                    <div className="title">{title}</div>
                    <div className="author">{author}</div>
                </div>
            </div>
        </div>
    );
}
