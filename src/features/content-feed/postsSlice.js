import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPostsAsyncThunk = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const proxyUrl = 'https://jsonp.afeld.me/';
        const apiUrl = 'https://www.reddit.com/r/memes.json';

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
        displayedIds: new Set([1]),
        isLoadingPosts: false,
        failedToLoadPosts: false
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPostsAsyncThunk.pending, (state) => {
                state.isLoadingPosts = true;
                state.failedToLoadPosts = false;
            })
            .addCase(fetchPostsAsyncThunk.fulfilled, (state, action) => {
                state.isLoadingPosts = false;
                state.failedToLoadPosts = false;
                
                // state.posts = action.payload.data.children.map(post => {

                //    return ({
                //     title: post.data.title,
                //     author: post.data.author,
                //     id: post.data.id,
                //     url_overridden_by_dest: post.data.url_overridden_by_dest
                //   })
                // });

                // || state.displayedIds.has(post.data.id)

                action.payload.data.children.forEach(post => {
                    if (post.data.post_hint === 'image' ) {
                      state.posts.push({
                        title: post.data.title,
                        author: post.data.author,
                        id: post.data.id,
                        url_overridden_by_dest: post.data.url_overridden_by_dest
                      });
                     
                    }
                  });

            })
            .addCase(fetchPostsAsyncThunk.rejected, (state, action) => {
                state.isLoadingPosts = false;
                state.failedToLoadPosts = true;
                console.log(action.error.message)
            })
    }
})

export const selectPosts = (state) => state.posts.posts;
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