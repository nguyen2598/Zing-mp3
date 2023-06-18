import React, { memo } from 'react';
import { ListItem } from '../../components';
import './ListSong.scss';
import icons from '../../ultis/icon';
import moment from 'moment';
import { useSelector } from 'react-redux';
const { IcDo } = icons;
export default memo(function ListSong({ totalDuration }) {
    const songs = useSelector((state) => state.music.songs);
    return (
        <div className="listsong">
            <div className="listsong-title">
                <span>bai hat</span>
                <span>Album</span>
                <span>thoi gian</span>
            </div>
            <div className="listsong-item">
                {songs?.map((item, index) => (
                    <ListItem key={index} songData={item} />
                ))}
            </div>
            <div className="listsong-footer">
                <div className="listsong-footer--length">{`${songs?.length} bài hát`}</div>
                <IcDo size={29} />
                <div className="listsong-footer--time">{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</div>
            </div>
        </div>
    );
});
