import React from 'react';
import { ChartCustom, LoadingData, NewRelease, Section, Slider, SongItem, WeekChart } from '../../../components';

import './Home.scss';
import { useSelector } from 'react-redux';
export default function Home() {
    const { loading } = useSelector((state) => state.home);
    console.log('loading', loading);
    return (
        <div className="home">
            {loading ? (
                <div className="loding-data">
                    <LoadingData className="loding" />
                </div>
            ) : (
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
            )}
        </div>
    );
}
