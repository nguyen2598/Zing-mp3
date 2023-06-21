import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../containers/public/Home/HomeSlice';
import bannerReducer from '../components/Slider/BannerSlice';
import searchReducer from '../containers/public/Search/SearchSlice';

const rootReducer = {
    home: homeReducer,
    music: bannerReducer,
    search: searchReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
