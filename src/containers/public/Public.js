import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Player, Si, SidebarRight, Sidebarleft } from '../../components';

import './Public.scss';
export default function Public() {
    const [isShowRightSlidebar, setIsShowRightSlidebar] = useState(false);
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
            <div className="public-player">
                <Player setIsShowRightSlidebar={setIsShowRightSlidebar} />
            </div>
        </div>
    );
}
