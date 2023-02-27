import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommentsAsyncThunk = createAsyncThunk(
    'comments/fetchComments',
    async ({subreddit, postId}) => {
        const apiUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }
);


export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: {
            '115': [
                'cool', 'awesome', 'much wow'
            ]

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

                const postId = action.payload[0].data.children[0].data.id;
                const postComments = action.payload[1].data.children.map(comment => comment.data.body)


                state.comments[postId] = postComments;

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