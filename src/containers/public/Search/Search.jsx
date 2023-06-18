import React from 'react';
import { Outlet } from 'react-router-dom';
import './Search.scss';
export default function Search() {
    return (
        <div>
            <div className="category-search">
                <span className="rs-search">Kết quả tìm kiếm</span>
                <div className="all--rs-search">
                    <span className="all--rs-search__item">TAT CA</span>
                    <span className="all--rs-search__item">BÀI HÁT</span>
                    <span className="all--rs-search__item">PLAYLIST/ALBUM</span>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
