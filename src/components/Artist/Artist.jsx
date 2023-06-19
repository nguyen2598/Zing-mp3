import React from 'react';
import './Artist.scss';
import formatNum from '../../ultis/formatNum';
export default function Artist({ img, title, view }) {
    return (
        <div className="artist">
            <div className="artist-img">
                <img src={img} alt="nghệ sĩ" />
            </div>
            <div className="artist-title">{title}</div>
            <div className="artist-view"> {formatNum(view)} quan tâm</div>
        </div>
    );
}
