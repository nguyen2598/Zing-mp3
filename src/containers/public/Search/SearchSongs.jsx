import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, LoadingData, NoContentBox } from '../../../components';
import { songIcon } from '../../../ultis/searchIcon';
import { musicApi } from '../../../callApi';
import { current } from '@reduxjs/toolkit';
import { fetchSearchSong, setPage } from './SearchSlice';
export default function SearchSongs() {
    const { loading, songData, maxPage, page } = useSelector((state) => state.search);
    console.log('serach', songData);
    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const fetchDetailplayList = async () => {
    //         setIsLoading(false);
    //         const response = await musicApi.apiArtistSong({ id: searchData?.top?.id, page: page, count: 20 });
    //         if (response?.err === 0) {
    //             setIsLoading(true);
    //             setData(response?.data?.items);
    //             setMaxPage(Math.ceil(+response?.data?.total / 20));
    //         } else {
    //             setIsLoading(true);
    //             setData(null);
    //         }
    //     };
    //     fetchDetailplayList();
    // }, [page, searchData]);
    const dispatch = useDispatch();

    const handlePageNext = () => {
        dispatch(setPage(page + 1));
    };
    const handlePagePrev = () => {
        dispatch(setPage(page - 1));
    };
    return (
        <div className="search-songs">
            <h3>Bài Hát</h3>
            {loading ? (
                <div className="loding-data">
                    <LoadingData className="loding" />
                </div>
            ) : (
                <div className="search-songs--content">
                    {songData ? (
                        <div>
                            {songData?.map((item, index) => (
                                <ListItem key={index} songData={item} />
                            ))}
                            <div className="pagination">
                                <div className={`${page > 1 ? '' : 'noClick'} pagin`} onClick={handlePagePrev}>
                                    Trang trước
                                </div>
                                <div className={`${page < maxPage ? '' : 'noClick'} pagin `} onClick={handlePageNext}>
                                    Trang sau
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NoContentBox text={'Không có Bài Hát được tìm thấy'} icon={songIcon} />
                    )}
                </div>
            )}
        </div>
    );
}
