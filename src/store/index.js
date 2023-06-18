import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../containers/public/Home/HomeSlice';
import bannerReducer from '../components/Slider/BannerSlice';

const rootReducer = {
    home: homeReducer,
    music: bannerReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
