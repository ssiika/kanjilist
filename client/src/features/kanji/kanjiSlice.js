import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import kanjiService from "./kanjiService";

const initialState = {
    kanjiList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createKanji = createAsyncThunk('kanji/create', 
async (kanjiData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user;
        return await kanjiService.createKanji(kanjiData, token);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message || 
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


export const kanjiSlice = createSlice({
    name: 'kanji', 
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createKanji.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createKanji.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.kanjiList.push(action.payload);
            })
            .addCase(createKanji.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const {reset} = kanjiSlice.actions;
export default kanjiSlice.reducer