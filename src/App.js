import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
    Home,
    Login,
    Public,
    MyMusic,
    Album,
    WeekRank,
    Zingchart,
    Search,
    SearchSongs,
    SearchAll,
    // SignUp,
} from './containers/public';
import path from './ultis/path';
import { fetchHome, getHome } from './containers/public/Home/HomeSlice';
import { getBanner } from './components/Slider/BannerSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchAlbum from './containers/public/Search/SearchAlbum';
import SearchArtist from './containers/public/Search/SearchArtist';
import SearchMV from './containers/public/Search/SearchMV';
import SignUp from './containers/public/SignUp/SignUp';
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchHome());
    }, []);

    return (
        <>
            <div className="App">
                <Routes>
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.SIGNUP} element={<SignUp />} />

                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.MY_MUSIC} element={<MyMusic />} />
                        <Route path={path.ALBUM_TITLE_PID} element={<Album />} />
                        <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
                        <Route path={path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
                        <Route path={path.ZING_CHART} element={<Zingchart />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.SONG} element={<SearchSongs />} />
                            <Route path={path.PLAYLIST__SONG} element={<SearchAlbum />} />
                            <Route path={path.ALL} element={<SearchAll />} />
                            <Route path={path.ARTIST} element={<SearchArtist />} />
                            <Route path={path.MV} element={<SearchMV />} />
                        </Route>
                    </Route>
                </Routes>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            ></ToastContainer>
        </>
    );
}

export default App;
