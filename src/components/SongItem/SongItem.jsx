import React from 'react';
import { memo } from 'react';
import './SongItem.scss';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from 'react-redux';
import { getCurSongId, play, setAlbum, setRecent } from '../Slider/BannerSlice';

export default memo(function SongItem({
    thumnail,
    title,
    artists,
    date,
    sid,
    order,
    percent,
    style,
    small,
    text_1_line,
}) {
    const dispatch = useDispatch();
    return (
        <div
            className="song-item"
            style={style ? { backgroundColor: '#ccc', borderRadius: '10px' } : {}}
            onClick={() => {
                dispatch(getCurSongId(sid));
                dispatch(play(true));
                dispatch(setAlbum(false));
                // dispatch(setRecent({ thumnail, title, sid, artists }));
            }}
        >
            {order ? (
                <div
                    className="song-item--order"
                    style={{ WebkitTextStrokeColor: order === 1 ? 'blue' : order === 2 ? '#33FF99' : 'red' }}
                >
                    {order}
                </div>
            ) : (
                ''
            )}
            <div className={`song-item--img ${small && 'small'}`}>
                <img src={thumnail} alt="" />
            </div>
            <div className="song-item--content">
                <span className={`song-item--title ${text_1_line && 'text_1_line'}`}>{title}</span>
                <span className="song-item--artists">{artists}</span>
                {/* <span className="song-item--date">{moment.unix(date).format('MM/DD/YY')}</span> */}
                {date ? <span className="song-item--date">{moment(date * 1000).fromNow()}</span> : ''}
            </div>
            {order ? <div className="song-item--percent">{percent}%</div> : ''}
        </div>
    );
});
