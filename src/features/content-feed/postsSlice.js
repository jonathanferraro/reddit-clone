import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPostsAsyncThunk = createAsyncThunk(
    'posts/fetchPosts',
    async (searchTerm) => {
        const proxyUrl = 'https://jsonp.afeld.me/';
        const apiUrl = `https://www.reddit.com/r/${searchTerm}.json?limit=75`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [{
            
                id: '1187ji9',
                title: 'Look at this cool pic',
                author_fullname: 'JimmmyRings',
                post_hint: 'image',
                url_overridden_by_dest: 'https://i.redd.it/c0wbibc90lja1.jpg'
        }],
        isLoadingPosts: false,
        failedToLoadPosts: false,
        isLoaded: false
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPostsAsyncThunk.pending, (state) => {
                state.isLoadingPosts = true;
                state.failedToLoadPosts = false;
                state.isLoaded = false;
            })
            .addCase(fetchPostsAsyncThunk.fulfilled, (state, action) => {
                state.isLoadingPosts = false;
                state.failedToLoadPosts = false;
                state.isLoaded = true;


                const subredditName = action.payload.data.children[0].data.subreddit;
                const posts = action.payload.data.children.map(post => {
                  return {
                    title: post.data.title,
                    author: post.data.author,
                    id: post.data.id,
                    url_overridden_by_dest: post.data.url_overridden_by_dest,
                    post_hint: post.data.post_hint,
                    selftext: post.data.selftext
                  };
                });
              
                // Update state with the new subreddit object
                state[subredditName] = {
                  name: subredditName,
                  posts: posts
                };

            })
            .addCase(fetchPostsAsyncThunk.rejected, (state, action) => {
                state.isLoadingPosts = false;
                state.failedToLoadPosts = true;
                state.isLoaded = false;
                console.log(action.error.message)
            })
    }
})

export const selectPosts = (state) => state.posts;
export const selectIsLoaded = (state) => state.posts.isLoaded;
export const selectIsLoadingPosts = (state) => state.posts.isLoadingPosts;
export default postsSlice.reducer;




/* 
posts:{
    id: {
        title: (title of the post),
        author_fullname: (author of post),
        post_hint: 'image',
        url_overridden_by_dest: (link of image),
        comments: []
    }
}


*/