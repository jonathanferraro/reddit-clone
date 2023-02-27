import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommentsAsyncThunk = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const apiUrl = ``;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }
);


export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {

        },
        isLoadingComments: false,
        failedToLoadComments: false
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCommentsAsyncThunk.pending, (state) => {
                state.isLoadingPosts = true;
                state.failedToLoadPosts = false;

            })
            .addCase(fetchCommentsAsyncThunk.fulfilled, (state, action) => {
                state.isLoadingPosts = false;
                state.failedToLoadPosts = false;

            })
            .addCase(fetchCommentsAsyncThunk.rejected, (state) => {
                state.isLoadingPosts = true;
                state.failedToLoadPosts = false;

            })
        }
})


export const selectComments = (state) => state.comments.comments;
export const selectIsLoadingComments = (state) => state.comments.isLoadingComments;

export default commentsSlice.reducer;