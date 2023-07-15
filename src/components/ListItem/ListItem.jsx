import React, { memo } from 'react';
import moment from 'moment';
import icons from '../../ultis/icon';
import './ListItem.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getCurSongId, play, setAlbum } from '../Slider/BannerSlice';

const { IcMus } = icons;
export default memo(function ListItem({ songData, isChart, num }) {
    const dispatch = useDispatch();
    // useSelector
    return (
        <div
            className="list-item"
            onClick={() => {
                dispatch(getCurSongId(songData?.encodeId));
                dispatch(play(true));
                dispatch(setAlbum(true));
            }}
        >
            <div className="list-item--info">
                {!isChart ? (
                    <div className="list-item--conmusic">
                        <IcMus />
                    </div>
                ) : (
                    <div className={`number ${num % 2 === 0 ? 'red' : 'blue'}`}>
                        <div className="num">{num}</div>
                        <div className="underlined">-</div>
                    </div>
                )}
                <img src={songData?.thumbnail} alt="" />
                <div className="list-item--content">
                    <span title={songData?.title}>
                        {`${songData?.title.length >= 20 ? songData?.title.slice(0, 20) + '...' : songData?.title}`}
                    </span>
                    <span>{songData?.artistsNames}</span>
                </div>
            </div>
            <div className="list-item--album">
                {songData?.album
                    ? `${
                          songData?.album?.title.length >= 20
                              ? songData?.album?.title.slice(0, 20) + '...'
                              : songData?.album?.title
                      }`
                    : ''}
            </div>
            <div className="list-item--time">{moment.utc(songData?.duration * 1000).format('mm:ss')}</div>
        </div>
    );
});
