import React, { useEffect, useState } from 'react';
import icons from '../../ultis/icon';
import { useSelector } from 'react-redux';
import SongItem from '../SongItem/SongItem';
import { musicApi } from '../../callApi';
const { IcBin } = icons;
function SidebarRight() {
    const [isRecent, setIsRecent] = useState(false);
    const [playList, setPlayList] = useState();
    const { CurSongData, CurAlbumId, isPlaying, recentSongs, CurSongId } = useSelector((state) => state.music);
    useEffect(() => {
        const fetchDetailplayList = async () => {
            const response = await musicApi.apiGetDetailPlayList({ id: CurAlbumId });
            if (response?.err === 0) {
                setPlayList(response?.data?.song?.items);
            }
        };
        if (CurAlbumId && isPlaying) fetchDetailplayList();
    }, [CurAlbumId, isPlaying]);
    useEffect(() => {
        isPlaying && setIsRecent(false);
    }, [isPlaying, CurSongId]);
    return (
        <div className="sidebar-right">
            <div className="sidebar-right--header">
                <div className="sidebar-right--header__left">
                    <span
                        className={!isRecent ? 'active' : ''}
                        onClick={() => setIsRecent((prev) => (prev ? !prev : prev))}
                    >
                        Danh sach phat
                    </span>
                    <span
                        className={isRecent ? 'active' : ''}
                        onClick={() => setIsRecent((prev) => (prev ? prev : !prev))}
                    >
                        Nghe gan day
                    </span>
                </div>
                <span className="icon-bin">
                    <IcBin size={14} />
                </span>
            </div>
            {!isRecent ? (
                <div className="sidebar-right--body">
                    <SongItem
                        thumnail={CurSongData?.thumbnail}
                        title={CurSongData?.title}
                        artists={CurSongData?.artistsNames}
                        sid={CurSongData?.encodeId}
                        small={true}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <span className="next">tieeps theo</span>
                        <span className="to-playlist">{`tu playlist ${CurSongData?.album?.title}`}</span>
                    </div>
                    <div className="content">
                        {playList?.map((item, index) => (
                            <SongItem
                                key={index}
                                thumnail={item?.thumbnail}
                                title={item?.title}
                                artists={item?.artistsNames}
                                sid={item?.encodeId}
                                small={true}
                                text_1_line={true}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="new-recent">
                    {JSON.parse(recentSongs)?.map((item, index) => (
                        <SongItem key={index} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SidebarRight;
