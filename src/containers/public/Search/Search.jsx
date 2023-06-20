import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useSearchParams } from 'react-router-dom';
import path from '../../../ultis/path';
import './Search.scss';
export default function Search() {
    // const [searchParams] = useSearchParams();
    // const [params, setParams] = useState(null);
    // useEffect(() => {
    //     const param = [];
    //     for (const entry of searchParams.entries()) {
    //         param.push(entry);
    //     }
    //     setParams(param);
    // }, [searchParams]);
    return (
        <div>
            <div className="category-search">
                <span className="rs-search">Kết quả tìm kiếm</span>
                <div className="all--rs-search">
                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to={path.SONG}
                    >
                        BÀI HÁT
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to={path.PLAYLIST__SONG}
                    >
                        PLAYLIST/ALBUM
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to={path.ARTIST}
                    >
                        NGHỆ SĨ/OA
                    </NavLink>

                    <NavLink
                        className={({ isActive }) =>
                            isActive ? 'active all--rs-search__item' : 'all--rs-search__item'
                        }
                        to={path.MV}
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
