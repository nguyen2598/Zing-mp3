import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { homeApi } from '../../../callApi';

export const fetchHome = createAsyncThunk('home/fetchHome', async () => {
    const response = await homeApi.getAll();
    return response.data.items;
});

const counterSlice = createSlice({
    name: 'home',
    initialState: {
        loading: false,
        homeData: [],
    },
    reducers: {
        getHome(state, action) {
            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHome.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchHome.fulfilled, (state, action) => {
                state.loading = false;
                state.homeData = action.payload;
            });
    },
});

const { actions, reducer } = counterSlice;
export const { getHome } = actions;
export default reducer;

// export function add(todo){
//     return function asd(dispatch,getState){
//     }
// }
