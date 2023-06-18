import React, { memo } from 'react';

import './Section.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import icons from '../../ultis/icon';
const { IcHeart, IcOutlineHeart, IcPlay, IcDot } = icons;

export default memo(function Section({ sectionId, author }) {
    const chillPlayList = useSelector(
        (state) => state?.home?.homeData?.find((item) => item.sectionId === sectionId) || null,
    );
    const navigate = useNavigate();
    return (
        <div className="section">
            <div className="section-title">
                <h3>{chillPlayList?.title}</h3>
                {chillPlayList?.items?.length > 5 ? <span>Tất cả</span> : ''}
            </div>
            <div className="section-items">
                {chillPlayList?.items
                    ?.filter((item, index) => index < 5)
                    ?.map((item, index) => (
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
                            {author ? <span className="section-item--title">{item?.title}</span> : ''}
                            {!author ? <span className="section-item--desc">{item?.sortDescription}</span> : ''}
                            {author ? <span className="section-item--author">{item?.artistsNames}</span> : ''}
                        </div>
                    ))}
            </div>
        </div>
    );
});
