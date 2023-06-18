import React, { useEffect, useState } from 'react';
import './Search.scss';
import icons from '../../ultis/icon';
import musicApi from '../../callApi/musicApi';
import { useDispatch } from 'react-redux';
import { fetchSearch } from '../Slider/BannerSlice';
import { useNavigate, createSearchParams } from 'react-router-dom';
import path from '../../ultis/path';

const { IcSearch } = icons;
export default function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setkeyword] = useState('');

    const handleSearch = async (e) => {
        // console.log(e);
        if (e.keyCode === 13 || e._reactName === 'onClick') {
            // const response = await musicApi.apiSearch({ keyword });
            // console.log('search', response);
            dispatch(fetchSearch({ keyword }));
            navigate({
                pathname: `/${path.SEARCH}/${path.ALL}`,
                search: createSearchParams({
                    q: keyword,
                }).toString(),
            });
        }
    };
    return (
        <div className="search">
            <button className="icon-search">
                <IcSearch onClick={handleSearch} style={{ cursor: 'pointer' }} />
            </button>
            <input
                value={keyword}
                onChange={(e) => setkeyword(e.target.value)}
                onKeyUp={handleSearch}
                type="text"
                className="input-search"
                placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
            />
        </div>
    );
}
