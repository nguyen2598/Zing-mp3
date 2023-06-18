import React, { useEffect, useRef, useState } from 'react';
import './Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { musicApi } from '../../callApi';
import { apiGetDetailSong } from '../../api/music';
import icons from '../../ultis/icon';
import { getCurSongId, play, setCurSongData, setRecent } from '../Slider/BannerSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Loading } from '../index';
// import {Loading} from ../
const {
    IcHeart,
    IcOutlineHeart,
    IcDot,
    IcRepet,
    IcSongNext,
    IcSongPrev,
    IcRepet1,
    IcPlay,
    IcPause,
    IcShu,
    IcNoteMusic,
    IcVolumFull,
    IcVolumMute,
    IcVolumLow,
} = icons;
var intervalId;
export default function Player({ setIsShowRightSlidebar }) {
    const [audio, setAudio] = useState(new Audio());
    const { CurSongId, isPlaying, atAlbum, songs } = useSelector((state) => state?.music);
    const dispatch = useDispatch();
    const [songInfo, setSongInfo] = useState(null);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isShuffe, setIsShuffe] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);
    const thumbRef = useRef();
    const trackRef = useRef();
    const [isLoadSource, setIsLoadSource] = useState(true);
    const [currentTimeSong, setCurrentTimeSong] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoadSource(false);
            // cách axiosClient
            // const response = await musicApi.getDetailSong({ id: CurSongId });
            const [res1, res2] = await Promise.all([
                musicApi.getDetailSong({ id: CurSongId || localStorage.getItem('CurSongId') }),
                musicApi.getSong({ id: CurSongId || localStorage.getItem('CurSongId') }),
            ]);
            // cách đíu j đấy , đang vừa khóc vừa đọc cơm mịa nó thằng lìn BE đíu tar bài toàn trả album nhá, fix mãi cứ tưởng mk sai cơm mịa nấu nữa đã lóng rồi còn gặp TH này nữa =((
            // const response = await apiGetDetailSong(CurSongId);
            if (res1.err === 0) {
                setSongInfo(res1.data);
                dispatch(setCurSongData(res1.data));
                localStorage.setItem('CurSongData', JSON.stringify(res1.data));
            }
            if (res2.err === 0) {
                setIsLoadSource(true);
                audio.pause();
                setAudio(new Audio(res2.data['128']));
                const { thumbnail, title, encodeId, artistsNames } = res1.data;
                dispatch(setRecent({ thumnail: thumbnail, title: title, sid: encodeId, artists: artistsNames }));
            }
            if (res2.err !== 0 && CurSongId !== null) {
                // vào phải bài vjp nó đíu cho phát nhạc =))
                audio.pause();
                // setCurrentTimeSong(0);
                setAudio(new Audio());
                dispatch(play(false));
                toast.warn(res2.msg);
            }
        };
        fetchData();
    }, [CurSongId]);

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffe) {
                handleShuffle();
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNext();
            } else {
                audio.pause();
                dispatch(play(false));
            }
        };
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audio, isShuffe, repeatMode]);

    useEffect(() => {
        // dispatch(play(true));

        if (isPlaying) {
            audio.load();
            audio.play();
        }
        // audioEl.current.play();
    }, [audio]);
    useEffect(() => {
        if (isPlaying) {
            intervalId = setInterval(() => {
                let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
                thumbRef.current.style.cssText = `width:${percent}%`;
                setCurrentTimeSong(Math.round(audio.currentTime));
            }, 200);
        } else {
            let percent = Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
            thumbRef.current.style.cssText = `width:${percent}%`;
            setCurrentTimeSong(Math.round(audio.currentTime));
            intervalId && clearInterval(intervalId);
        }
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [isPlaying, audio]);
    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause();
            dispatch(play(false));
        } else {
            audio.play();
            dispatch(play(true));
        }
    };

    const handleClickprogressbar = (e) => {
        audio.play();
        dispatch(play(true));
        const rect = trackRef.current.getBoundingClientRect();
        const xTrackRef = rect.left;
        const wTrackRef = rect.width;
        const xThumb = e.clientX;
        const percent = (100 * (xThumb - xTrackRef)) / wTrackRef;
        thumbRef.current.style.cssText = `width:${percent}%`;
        audio.currentTime = (songInfo?.duration * percent) / 100;
    };

    const handlePrev = () => {
        let currentSongIndex;
        currentSongIndex = songs?.findIndex((item) => item?.encodeId === CurSongId);
        if (currentSongIndex > 0) {
            dispatch(play(true));
            dispatch(getCurSongId(songs[currentSongIndex - 1]?.encodeId));
        }
    };
    const handleNext = () => {
        let currentSongIndex;
        currentSongIndex = songs?.findIndex((item) => item?.encodeId === CurSongId);
        if (currentSongIndex < songs.length - 1) {
            dispatch(play(true));

            dispatch(getCurSongId(songs[currentSongIndex + 1]?.encodeId));
        }
    };
    const handleRepeatOne = () => {
        // audio.currentTime = 0;
        audio.play();
        // let currentSongIndex;
        // currentSongIndex = songs?.findIndex((item) => item?.encodeId === CurSongId);
        // dispatch(play(true));

        // dispatch(getCurSongId(songs[currentSongIndex]?.encodeId));
    };
    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1;
        dispatch(getCurSongId(songs[randomIndex]?.encodeId));
        dispatch(play(true));
        // setIsShuffe((prev) => !prev);
    };
    const handleChangeVolume = (e) => {
        setVolume(e.target.value);
        audio.volume = e.target.value / 100;
    };
    return (
        <div className="player">
            <div className="detail-song">
                <img src={songInfo?.thumbnail} alt="thumbnail" className="thumb-img" />
                <div className="detail-song-content">
                    <span title={songInfo?.title}>{songInfo?.title || 'Ngày mưa tan như bao cơn gió'}</span>
                    <span>{songInfo?.artistsNames || 'mr.sino'}</span>
                </div>
                <div className="detail-song--icon">
                    <span>
                        <IcHeart />
                    </span>
                    {/* <span>
                        <IcOutlineHeart />
                    </span> */}
                    <span>
                        <IcDot />
                    </span>
                </div>
            </div>
            <div className="main-player">
                <div className="main-player--controll-1">
                    <span
                        title="bật phát ngẫu nhiên"
                        onClick={() => setIsShuffe((prev) => !prev)}
                        className={`${isShuffe ? 'shuffe' : ''}`}
                    >
                        <IcShu />
                    </span>
                    <span onClick={handlePrev} className={`${atAlbum ? `` : 'disable'}`}>
                        <IcSongPrev />
                    </span>
                    <span onClick={handleTogglePlayMusic}>
                        {!isLoadSource ? <Loading /> : isPlaying ? <IcPause /> : <IcPlay />}
                    </span>
                    <span onClick={handleNext} className={`${atAlbum ? `` : 'disable'}`}>
                        <IcSongNext />
                    </span>
                    <span
                        title="Bật phát lại tất cả"
                        className={`${repeatMode ? 'repeat' : ''}`}
                        onClick={() => setRepeatMode((prev) => (prev < 2 ? prev + 1 : 0))}
                    >
                        {repeatMode === 1 ? <IcRepet1 /> : <IcRepet />}
                    </span>
                </div>
                <div className="main-player--controll-2">
                    <span>{moment.utc(currentTimeSong * 1000).format('mm:ss')}</span>
                    <div ref={trackRef} className="truck" onClick={handleClickprogressbar}>
                        <div ref={thumbRef} className="proress"></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className="volume-player">
                <div className="volume">
                    <div
                        className="volume-icon"
                        onClick={() => {
                            const volumeNew = volume === 0 ? 70 : 0;
                            setVolume(volumeNew);
                            audio.volume = volumeNew / 100;
                        }}
                    >
                        {volume > 50 ? <IcVolumFull /> : volume > 0 ? <IcVolumLow /> : <IcVolumMute />}
                    </div>{' '}
                    <input
                        type="range"
                        name=""
                        id=""
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={handleChangeVolume}
                    />
                </div>
                <span
                    onClick={() => {
                        setIsShowRightSlidebar((prev) => !prev);
                    }}
                >
                    <IcNoteMusic size={24} />
                </span>
            </div>
        </div>
    );
}
