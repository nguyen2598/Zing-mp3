import React, { useEffect } from 'react';
import { ChartCustom, Header, NewRelease, Section, Slider, SongItem, WeekChart } from '../../../components';

import './Home.scss';
import { homeApi } from '../../../callApi';
import { useDispatch } from 'react-redux';
import { add, getHome } from './HomeSlice';
export default function Home() {
    return (
        <div className="home">
            <div className="home-header">
                {/* <Header /> */}
                <Slider />
                <NewRelease />
                <Section sectionId={'hEditorTheme'} />
                <Section sectionId={'hEditorTheme2'} />
                <Section sectionId={'hArtistTheme'} />
                {/* author:check xem co tac gia ko */}
                <ChartCustom />
                <Section sectionId={'h100'} author />
                <Section sectionId={'hAlbum'} author />
                <WeekChart />
            </div>
        </div>
    );
}
