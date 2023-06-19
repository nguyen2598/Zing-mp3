import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './Search.scss';
export default function Search() {
    return (
        <div>
            <div className="category-search">
                <span className="rs-search">Kết quả tìm kiếm</span>
                <div className="all--rs-search">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to="bai-hat"
                    >
                        BÀI HÁT
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to="playlist"
                    >
                        PLAYLIST/ALBUM
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to="artist"
                    >
                        NGHỆ SĨ/OA
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to="video"
                    >
                        MV
                    </NavLink>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
