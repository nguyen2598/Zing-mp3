import React from 'react';
import './MyMusic.scss';
export default function MyMusic() {
    return (
        <div className="myMusic">
            <div className="image">
                <img src="https://lh3.googleusercontent.com/a/default-user=s40-p" alt="" />
            </div>
            <div className="title">Đặng Đình Nguyên</div>
            <div className="my-list">
                <ul className="my-list-nav">
                    <li className="my-list-nav__item">Bài hát</li>
                    <li className="my-list-nav__item">Playlist</li>
                    <li className="my-list-nav__item">Nghệ sĩ</li>
                </ul>
            </div>
        </div>
    );
}
