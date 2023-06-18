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
} from './containers/public';
import path from './ultis/path';
import { fetchHome, getHome } from './containers/public/Home/HomeSlice';
import { getBanner } from './components/Slider/BannerSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchHome());
    }, []);

    // const datas=useSelector(state=>state?.home?.homeData?.find(item=>item.sectionType==='banner')||null)
    // dispatch(getBanner(datas))
    // const data=useSelector(state=>state)
    // dispatch(getHome())
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path={path.PUBLIC} element={<Public />}>
                        <Route path={path.HOME} element={<Home />} />
                        <Route path={path.LOGIN} element={<Login />} />
                        <Route path={path.MY_MUSIC} element={<MyMusic />} />
                        <Route path={path.ALBUM_TITLE_PID} element={<Album />} />
                        <Route path={path.PLAYLIST_TITLE_PID} element={<Album />} />
                        <Route path={path.WEEKRANK_TITLE_PID} element={<WeekRank />} />
                        <Route path={path.ZING_CHART} element={<Zingchart />} />
                        <Route path={path.SEARCH} element={<Search />}>
                            <Route path={path.SONG} element={<SearchSongs />} />
                            <Route path={path.ALL} element={<SearchAll />} />
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
