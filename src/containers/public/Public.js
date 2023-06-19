import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Player, Si, SidebarRight, Sidebarleft } from '../../components';

import './Public.scss';
import { useSelector } from 'react-redux';
export default function Public() {
    const { isPlaying } = useSelector((state) => state?.music);
    console.log('is', isPlaying);
    const [isShowRightSlidebar, setIsShowRightSlidebar] = useState(false);
    const [CheckIsPlayer, setCheckIsPlayer] = useState(localStorage?.getItem('CurSongId'));
    console.log('aothe', CheckIsPlayer);
    useEffect(() => {
        if (isPlaying) setCheckIsPlayer(true);
    }, [isPlaying]);
    return (
        <div className="public">
            <div className="public-main">
                <div className="public-left">
                    <Sidebarleft />
                </div>
                <div className="public-outlet">
                    <Header />
                    <Outlet />
                </div>
                {isShowRightSlidebar && (
                    <div className="public-right">
                        <SidebarRight />
                    </div>
                )}
            </div>
            <div className={`public-player ${CheckIsPlayer ? 'h-90' : ''} `}>
                <Player setIsShowRightSlidebar={setIsShowRightSlidebar} />
            </div>
        </div>
    );
}
