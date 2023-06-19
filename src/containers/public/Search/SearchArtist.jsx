import React from 'react';
import { Artist } from '../../../components';
import { useSelector } from 'react-redux';

export default function SearchArtist() {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="search-artist">
            <h3>NGHỆ SĨ/OA</h3>
            <div className="search-artist--content">
                {searchData?.artists?.map((item, index) => (
                    <div key={index} className="search-artist--item">
                        <Artist img={item.thumbnail} title={item.name} view={item.totalFollow} />
                    </div>
                ))}
            </div>
        </div>
    );
}
