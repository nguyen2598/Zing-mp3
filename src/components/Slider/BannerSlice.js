import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { musicApi } from '../../callApi';

export const fetchSearch = createAsyncThunk('music/fetchSearch', async ({ keyword }) => {
    const response = await musicApi.apiSearch({ keyword });
    return response;
});

const bannerSlice = createSlice({
    name: 'music',
    initialState: {
        CurSongId: localStorage.getItem('CurSongId') || null,
        CurSongData: localStorage.getItem('CurSongData') || null,
        CurAlbumId: localStorage.getItem('CurAlbumId') || null,
        isPlaying: false,
        atAlbum: false,
        songs: null,
        recentSongs: localStorage.getItem('recentSongs') || [],
        searchData: {},
    },
    reducers: {
        getBanner(state, action) {
            return state;
            // return state.homeData?.find(item=>item.sectionType==='banner')||null
        },
        getCurSongId(state, action) {
            localStorage.setItem('CurSongId', action.payload);
            return { ...state, CurSongId: action.payload };
        },
        play(state, action) {
            return { ...state, isPlaying: action.payload };
        },
        setAlbum(state, action) {
            return { ...state, atAlbum: action.payload };
        },
        playlist(state, action) {
            return { ...state, songs: action.payload || null };
        },
        setCurSongData(state, action) {
            return { ...state, CurSongData: action.payload };
        },
        setAlbumId(state, action) {
            localStorage.setItem('CurAlbumId', action.payload);
            return { ...state, CurAlbumId: action.payload };
        },
        setRecent(state, action) {
            localStorage.setItem(
                'recentSongs',
                JSON.stringify(
                    JSON.parse(localStorage.getItem('recentSongs'))?.length > 0
                        ? [action.payload, ...JSON.parse(localStorage.getItem('recentSongs'))]
                              ?.filter((item, index, self) => self.findIndex((obj) => obj?.sid === item?.sid) === index)
                              ?.filter((item, index) => index < 20)
                        : [action.payload],
                ),
            );
            return { ...state, recentSongs: localStorage.getItem('recentSongs') };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                // state.loading = true;
            })

            .addCase(fetchSearch.fulfilled, (state, action) => {
                if (action.payload.err === 0) state.searchData = action.payload.data;
                else state.searchData = null;
            });
    },

    // extraReducers: (builder) => {
    //     builder.addCase(fetchDetailplayList.fulfilled, (state, action) => {
    //         state.songs = action.payload;
    //     });
    // },
});

const { actions, reducer } = bannerSlice;
export const { getBanner, setAlbum, getCurSongId, play, playlist, setCurSongData, setAlbumId, setRecent } = actions;
export default reducer;
