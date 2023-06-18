import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './NewRelease.scss';
import { SongItem } from '../../components';
export default function NewRelease() {
    const newRelease = useSelector((state) =>
        state?.home?.homeData?.find((item) => item?.sectionType === 'new-release'),
    );
    const [isActived, setIsActived] = useState(0);
    return (
        <div className="new-release">
            <div className="release-title">
                <h3>{newRelease?.title}</h3>
                <span>Tất cả</span>
            </div>
            <div className="release-button">
                {newRelease?.items &&
                    Object.keys(newRelease?.items)?.map((item, index) => (
                        <button
                            onClick={() => setIsActived(index)}
                            key={index}
                            className={`${isActived === index ? 'active' : ''}`}
                        >
                            {item === 'all' ? 'Tất cả' : item === 'vPop' ? 'Việt Nam' : 'Quốc tế'}
                        </button>
                    ))}
            </div>
            <div className="release-content">
                {newRelease?.items &&
                    newRelease?.items[Object.keys(newRelease?.items)[isActived]]
                        ?.filter((item, index) => index < 12)
                        ?.map((item, index) => (
                            <div className="song-item--container" key={index}>
                                <SongItem
                                    thumnail={item.thumbnail}
                                    title={item.title}
                                    artists={item.artistsNames}
                                    date={item.releaseDate}
                                    sid={item.encodeId}
                                />
                            </div>
                        ))}
            </div>
        </div>
    );
}
