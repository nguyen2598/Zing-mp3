import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { musicApi } from '../../../callApi';

export const fetchSearchSong = createAsyncThunk('song/fetchSearchSong', async ({ id, page }) => {
    const response = await musicApi.apiArtistSong({ id, page, count: 20 });
    if (response?.err === 0) {
        return { songData: response?.data?.items, maxPage: Math.ceil(+response?.data?.total / 20), page };
    } else {
        return { songData: null, maxPage: null, page };
    }
});

const counterSlice = createSlice({
    name: 'search',
    initialState: {
        page: 1,
        loading: false,
        songData: null,
        maxPage: null,
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchSong.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchSearchSong.fulfilled, (state, action) => {
                console.log('act', action.payload);
                return { ...action.payload, loading: false };
            });
    },
});

const { actions, reducer } = counterSlice;
export const { setPage, setLoading } = actions;

export default reducer;
