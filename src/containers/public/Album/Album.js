import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { apiGetDetaiPlaylist } from '../../../api/music';
import musicApi from '../../../callApi/musicApi';
import { AudioLoad, ListSong, LoadingData } from '../../../components';
import moment from 'moment';
import './Album.scss';
import { useDispatch, useSelector } from 'react-redux';
import { playlist, setAlbumId } from '../../../components/Slider/BannerSlice';
import icons from '../../../ultis/icon';
import { getCurSongId } from '../../../components/Slider/BannerSlice';
import { setAlbum } from '../../../components/Slider/BannerSlice';
import { play } from '../../../components/Slider/BannerSlice';
const { IcPlayoutline } = icons;
export default function Album() {
    const { title, pid } = useParams();
    const location = useLocation();
    const [playListData, setPlayListData] = useState({});
    const dispatch = useDispatch();
    const { CurSongId, isPlaying, atAlbum, songs } = useSelector((state) => state?.music);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(setAlbumId(pid));
        const fetchDetailplayList = async () => {
            const response = await musicApi.apiGetDetailPlayList({ id: pid });
            if (response?.err === 0) {
                setIsLoading(true);
                setPlayListData(response.data);
                dispatch(playlist(response?.data?.song?.items));
            }
        };
        fetchDetailplayList();
    }, [pid]);
    useEffect(() => {
        if (location?.state?.playAlbum && playListData?.song?.items) {
            const randomSong = Math.round(Math.random() * playListData?.song?.items?.length);
            dispatch(getCurSongId(playListData?.song?.items[randomSong]?.encodeId));
            dispatch(play(true));
            dispatch(setAlbum(true));
        }
    }, [pid, playListData]);
    return (
        <div className="album">
            {!isLoading ? (
                <div className="loding-data">
                    <LoadingData />
                </div>
            ) : (
                ''
            )}
            <div className="thumbnail">
                <div className={`thumbnail-img  `}>
                    <img src={playListData?.thumbnailM} alt="thumbnail" className={`${isPlaying ? 'rotate' : ''} `} />
                    <div className="audio-load">{isPlaying ? <AudioLoad /> : <IcPlayoutline size={50} />}</div>
                </div>
                <div className="thumbnail-heading">{playListData.title}</div>
                <div className="thumbnail-update">
                    <span>Cập nhật: </span>
                    <span>{moment.unix(playListData?.contentLastUpdate).format('DD/MM/YY')}</span>
                </div>
                <span title={playListData?.artistsNames} className="thumbnail-name">
                    {playListData?.artistsNames}
                </span>
                <span className="thumbnail-liked">{`${parseInt(playListData?.like / 1000)}k người yêu thích`}</span>
            </div>
            <div className="playlist">
                <div className="playlist-main">
                    <span>Lời tựa </span>
                    <span>{playListData?.sortDescription}</span>
                </div>
                <div className="playlist-song">
                    <ListSong totalDuration={playListData?.song?.totalDuration} />
                </div>
            </div>
        </div>
    );
}
