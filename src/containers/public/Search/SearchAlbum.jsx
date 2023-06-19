import React from 'react';
import { useSelector } from 'react-redux';

import icons from '../../../ultis/icon';
import { useNavigate } from 'react-router-dom';
const { IcOutlineHeart, IcPlay, IcDot } = icons;

export default function SearchAlbum() {
    const { searchData } = useSelector((state) => state.music);
    const navigate = useNavigate();
    return (
        <div className="search-album">
            <h3>Playlist/Album</h3>
            <div className="search-album--content">
                {searchData?.playlists?.map((item, index) => (
                    <div
                        key={index}
                        className="section-item"
                        onClick={() => {
                            const albumPath = item?.link?.split('.')[0];

                            navigate(albumPath, { state: { playAlbum: false } });
                        }}
                    >
                        <div className="section-item--img">
                            <div className="section-item--img__ovelay">
                                <span>
                                    <IcOutlineHeart size={24} />
                                </span>
                                <span>
                                    <IcPlay
                                        size={24}
                                        onClick={(e) => {
                                            e.stopPropagation(); // chống nổi bọt
                                            const albumPath = item?.link?.split('.')[0];

                                            navigate(albumPath, { state: { playAlbum: true } });
                                        }}
                                    />
                                </span>
                                <span>
                                    <IcDot size={24} />
                                </span>
                            </div>
                            <img src={item?.thumbnailM} alt="" />
                        </div>
                        {/* {author ? <span className="section-item--title">{item?.title}</span> : ''}
                        {!author ? <span className="section-item--desc">{item?.sortDescription}</span> : ''}
                        {author ? <span className="section-item--author">{item?.artistsNames}</span> : ''} */}
                    </div>
                ))}
            </div>
        </div>
    );
}
