import React from 'react';
import { useSelector } from 'react-redux';
import { ListItem, NoContentBox } from '../../../components';
import { songIcon } from '../../../ultis/searchIcon';
export default function SearchSongs() {
    const { searchData } = useSelector((state) => state.music);
    console.log(searchData);
    return (
        <div className="search-songs">
            <h3>Bài Hát</h3>
            <div className="search-songs--content">
                {searchData?.songs ? (
                    searchData?.songs?.map((item, index) => <ListItem key={index} songData={item} />)
                ) : (
                    <NoContentBox text={'Không có Bài Hát được tìm thấy'} icon={songIcon} />
                )}
            </div>
        </div>
    );
}
