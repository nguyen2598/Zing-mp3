import React from 'react';
import { useSelector } from 'react-redux';
import { MV, NoContentBox } from '../../../components';
import { mvIcon } from '../../../ultis/searchIcon';
export default function SearchMV() {
    const { searchData } = useSelector((state) => state.music);
    return (
        <div className="search-mv">
            <h3>MV</h3>
            <div className="search-mv--content">
                {searchData?.videos ? (
                    searchData?.videos?.map((item, index) => (
                        <div key={index} className="search-mv--item">
                            <MV
                                img1={item.thumbnail}
                                img2={item?.artist?.thumbnail}
                                title={item.title}
                                author={item?.artist?.name}
                            />
                        </div>
                    ))
                ) : (
                    <NoContentBox text={'Không có MV được tìm thấy'} icon={mvIcon} />
                )}
            </div>
        </div>
    );
}
