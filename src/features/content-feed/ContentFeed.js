import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPostsAsyncThunk } from "./postsSlice";
import { selectSearch } from "../search/searchSlice";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";


export default function ContentFeed() {
    const dispatch = useDispatch()
    const searchTerm = useSelector(selectSearch)
    const posts = useSelector(selectPosts)

    useEffect(() => {
        dispatch(fetchPostsAsyncThunk(searchTerm));
    }, [dispatch, searchTerm]);


    const subreddit = posts[searchTerm];
    return (
      <div>
        <h1>b/{searchTerm}</h1>
        <div className="post-container">
          {subreddit && subreddit.posts.map(post => (
            post.post_hint === 'image' &&
            <ImagePost 
            className="post-tile"
              key={post.id}
              title={post.title}
              author={post.author}
              url_overridden_by_dest={post.url_overridden_by_dest}
              id={post.id}
            />
          ))}
        </div>
        <button className="ccarousel-button-left">Left</button>
        <button className="carousel-button-right">Right</button>
        <div className="post-text-container">
          {subreddit && subreddit.posts.map(post => (
            post.post_hint === undefined &&
            <TextPost 
              key={post.id}
              title={post.title} 
              author={post.author} 
              selftext={post.selftext} 
              id={post.id}
            />
          ))}
        </div>
      </div>
    );
}