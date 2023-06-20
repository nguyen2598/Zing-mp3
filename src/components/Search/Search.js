import React, { useEffect, useRef, useState } from 'react';
import './Search.scss';
import icons from '../../ultis/icon';
import musicApi from '../../callApi/musicApi';
import { useDispatch } from 'react-redux';
import { fetchSearch } from '../Slider/BannerSlice';
import { useNavigate, createSearchParams } from 'react-router-dom';
import path from '../../ultis/path';
import { BiHistory } from 'react-icons/bi';
import { FiTrendingUp } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';

const { IcSearch } = icons;
export default function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setkeyword] = useState('');
    const spanRef = useRef(null);
    const inputRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                // Xử lý sự kiện khi người dùng ấn bên ngoài thẻ A
                handleBlur();
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const handleSearch = async (e) => {
        if ((e.keyCode === 13 || e._reactName === 'onClick') && keyword.trim().length > 0) {
            inputRef.current.blur();
            handleBlur();
            const historyList = localStorage?.getItem('searchinput')
                ? JSON.parse(localStorage.getItem('searchinput'))
                : [];
            localStorage.setItem(
                'searchinput',
                JSON.stringify([keyword, ...historyList]?.filter((item, index) => index < 6)),
            );
            dispatch(fetchSearch({ keyword }));
            navigate({
                pathname: `/${path.SEARCH}/${path.SONG}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };
    const handleFocus = () => {
        spanRef.current.style.display = 'block';
        searchRef.current.style.overflow = 'visible';
    };
    const handleBlur = () => {
        spanRef.current.style.display = 'none';
        searchRef.current.style.overflow = 'hidden';
    };
    const handleSearchClick = (value) => {
        handleBlur();
        setkeyword(value);
        dispatch(fetchSearch({ keyword: value }));
        navigate({
            pathname: `/${path.SEARCH}/${path.SONG}`,
            search: createSearchParams({
                q: value,
            }).toString(),
        });
    };
    return (
        <div className="search" ref={searchRef}>
            <button className="icon-search">
                <IcSearch onClick={handleSearch} style={{ cursor: 'pointer' }} />
            </button>
            <input
                ref={inputRef}
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
                onKeyUp={handleSearch}
                onFocus={handleFocus}
                // onBlur={handleBlur}
                type="text"
                className="input-search"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
            />
            <button className="icon-close">
                {keyword.trim().length > 0 ? (
                    <AiOutlineClose onClick={() => setkeyword('')} style={{ cursor: 'pointer' }} />
                ) : (
                    ''
                )}
            </button>
            <span className="history-search" ref={spanRef} onClick={(e) => e.stopPropagation()}>
                <h3>Lịch sử tìm kiếm</h3>
                <ul className="history-search--list">
                    {localStorage?.getItem('searchinput') ? (
                        JSON.parse(localStorage.getItem('searchinput'))?.map((item, index) => (
                            <li
                                key={index}
                                className="history-propose--item"
                                onClick={(e) => {
                                    // inputRef.current.focus();
                                    // e.stopPropagation();
                                    // inputRef.current.focus();
                                    handleSearchClick(item);
                                }}
                            >
                                <BiHistory />
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="history-propose--item">Không có lịch sử tìm kiếm</li>
                    )}
                </ul>

                <div className="process"></div>

                <h3>Đề xuất cho bạn</h3>
                <ul className="history-search--list">
                    {localStorage?.getItem('historySearch') ? (
                        JSON.parse(localStorage.getItem('historySearch'))?.map((item, index) => (
                            <li
                                key={index}
                                className="history-propose--item"
                                onClick={(e) => {
                                    // e.preventDefault();
                                    // inputRef.current.focus();
                                    // e.stopPropagation();
                                    // inputRef.current.focus();
                                    handleSearchClick(item);
                                }}
                            >
                                <FiTrendingUp />
                                {item}
                            </li>
                        ))
                    ) : (
                        <li className="history-propose--item">Không có lịch sử tìm kiếm</li>
                    )}
                </ul>
            </span>
        </div>
    );
}
