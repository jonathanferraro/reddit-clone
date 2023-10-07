import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCommentsAsyncThunk = createAsyncThunk(
    'comments/fetchComments',
    async ({subreddit, postId}) => {
        const apiUrl = `https://www.reddit.com/r/${subreddit}/comments/${postId}.json?limit=35`;

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
                state.isLoadingComments = true;
                state.failedToLoadComments = false;

            })
            .addCase(fetchCommentsAsyncThunk.fulfilled, (state, action) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = false;

                const postId = action.payload[0].data.children[0].data.id;
                const postComments = action.payload[1].data.children.map(comment => {
                    return {
                        comment: comment.data.body,
                        author: comment.data.author,
                        created_utc: comment.data.created_utc,
                    }
                    
                })


                state.comments[postId] = postComments;

            })
            .addCase(fetchCommentsAsyncThunk.rejected, (state) => {
                state.isLoadingComments = false;
                state.failedToLoadComments = true;

            })
        }
})


export const selectComments = (state) => state.comments.comments;
export const selectIsLoadingComments = (state) => state.comments.isLoadingComments;

export default commentsSlice.reducer;

// OG diagram of state layout

/**
    comments: {
        comments: {
            postId: [
                'comment',
                'commment',
                'comment',
                'etc'
            ]
        }
    }


 */

// diagram of state layout

/**
    comments: {
        comments: {
            postId: [
                {
                    body: ('comment'),
                    author: ('author username'),
                    created_utc: (date posted)

                },
                 {
                    body: ('comment'),
                    author: ('author username'),
                    created_utc: (date posted)

                },
                {
                    body: ('comment'),
                    author: ('author username'),
                    created_utc: (date posted)

                },
                etc....

            ]
        }
    }


 */