import React from 'react';
import { useSelector } from 'react-redux';

export default function SearchAll() {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="search-all">
            <div className="search-all_most ">
                <h3>Nổi bật</h3>
                <div className="search-all_most__content">
                    {searchData?.top && (
                        <div className="search-all_most__item">
                            <img src={searchData.top.thumbnail} className="search-all_most__img" />
                            <div className="search-all_most__text">
                                <span>{searchData?.top?.objectType === 'artist' ? 'Nghệ sĩ' : 'Bài hát'}</span>
                                <span>{searchData?.top?.title || searchData?.top?.name}</span>
                            </div>
                        </div>
                    )}
                    <div className="search-all_most__item">la 1</div>
                    <div className="search-all_most__item">la 1</div>
                </div>
            </div>
        </div>
    );
}
