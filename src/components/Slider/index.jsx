import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Slider.scss';
import { getArrSlider } from '../../ultis/fn';
import { getBanner, getCurSongId, play, playlist, setAlbum } from './BannerSlice';
import { useNavigate } from 'react-router-dom';
export default function Slider() {
    const banner = useSelector(
        (state) => state.home.homeData?.find((item) => item.sectionId === 'hSlider')?.items || null,
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // dispatch(getBanner(banner))
    useEffect(() => {
        const sliderEl = document.getElementsByClassName('slider-item');
        let min = 0;
        let max = 2;

        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEl.length - 1);
            for (let i = 0; i < sliderEl.length; i++) {
                sliderEl[i]?.classList?.remove('slide-right');
                sliderEl[i]?.classList?.remove('slide-left');
                sliderEl[i]?.classList?.remove('slide-left2');
                if (list.some((item) => item === i)) sliderEl[i].style.display = 'block';
                else sliderEl[i].style.display = 'none ';
            }

            list.forEach((item) => {
                if (item === max) {
                    sliderEl[item]?.classList?.add('slide-right');
                } else if (item === min) {
                    sliderEl[item]?.classList?.add('slide-left');
                } else {
                    sliderEl[item]?.classList?.add('slide-left2');
                }
            });

            min = min === sliderEl.length - 1 ? 0 : min + 1;
            max = max === sliderEl.length - 1 ? 0 : max + 1;
        }, 3000);

        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [banner]);
    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(getCurSongId(item.encodeId));
            dispatch(play(true));
            dispatch(setAlbum(false));
            // dispatch(playlist(null));
        } else if (item?.type === 4 || item?.type === 3) {
            const albumPath = item?.link?.split('.')[0];

            navigate(albumPath);
        } else {
            dispatch(setAlbum(false));
            // dispatch(playlist(null));
        }
    };
    return (
        <div className="slider">
            <div className="slider-content">
                {banner?.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleClickBanner(item)}
                        className={`image slider-item ${index <= 2 ? 'block' : 'hidden'}`}
                    >
                        <img src={item.banner} />
                    </div>
                ))}
            </div>
        </div>
    );
}
