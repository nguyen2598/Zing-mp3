import React from 'react';
import { useSelector } from 'react-redux';
import { MV } from '../../../components';

export default function SearchMV() {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="search-mv">
            <h3>MV</h3>
            <div className="search-mv--content">
                {searchData?.videos?.map((item, index) => (
                    <div key={index} className="search-mv--item">
                        <MV
                            img1={item.thumbnail}
                            img2={item?.artist?.thumbnail}
                            title={item.title}
                            author={item?.artist?.name}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
