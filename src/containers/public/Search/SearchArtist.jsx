import React from 'react';
import { Artist, NoContentBox } from '../../../components';
import { useSelector } from 'react-redux';
import { artistIcon } from '../../../ultis/searchIcon';

export default function SearchArtist() {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="search-artist">
            <h3>NGHỆ SĨ/OA</h3>
            <div className="search-artist--content">
                {searchData?.artists ? (
                    searchData?.artists?.map((item, index) => (
                        <div key={index} className="search-artist--item">
                            <Artist img={item.thumbnail} title={item.name} view={item.totalFollow} />
                        </div>
                    ))
                ) : (
                    <NoContentBox text={'Không có Nghệ sĩ/OA được tìm thấy'} icon={artistIcon} />
                )}
            </div>
        </div>
    );
}
