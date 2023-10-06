import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPostsAsyncThunk, selectIsLoaded, selectIsLoadingPosts } from "./postsSlice";
import { selectSearch } from "../search/searchSlice";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";


export default function ContentFeed() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearch);
    const posts = useSelector(selectPosts);
    const isLoaded = useSelector(selectIsLoaded);
    const isLoading = useSelector(selectIsLoadingPosts);
    const subreddit = posts[searchTerm];

    useEffect(() => {
        dispatch(fetchPostsAsyncThunk(searchTerm));
    }, [dispatch, searchTerm]);

    useEffect(() => {
        setTimeout(() => {
          const carousel = document.querySelector('.post-container');
          const carouselBtnLeft = document.querySelector('.carousel-button-left');
          const carouselBtnRight = document.querySelector('.carousel-button-right');
          const postWidth = carousel.querySelector('.post-tile').offsetWidth;
      
          carouselBtnLeft.addEventListener('click', () => {
            carousel.scrollBy({
              left: -postWidth,
              behavior: 'smooth'
            });
          });
      
          carouselBtnRight.addEventListener('click', () => {
            carousel.scrollBy({
              left: postWidth,
              behavior: 'smooth'
            });
          }); 
        }, 3500);
      }, [searchTerm]);

    if (isLoading) {
      return <h2 className="loading-posts"> Looking for SubBreaddit... </h2>
    }
      
    return (
      <div>
        <h1>b/{searchTerm}</h1>
        {subreddit ? ( 
        <div>
          <div className="post-container">
            {subreddit && subreddit.posts.map(post => (
              (post.post_hint === 'image' && post.title.length < 40) &&
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
          <button className="carousel-button-left">Left</button>
          <button className="carousel-button-right">Right</button>

          <div className="post-text-container">
            <p className="text-red-800">TEstTESTESTESTESTEST</p>
            {subreddit && subreddit.posts.map(post => 
            (post.selftext.length > 50) &&
            (
              <TextPost 
                key={post.id}
                title={post.title} 
                author={post.author} 
                selftext={post.selftext}
                score={post.score}
                created_utc={post.created_utc}
                id={post.id}
              />
            ))}
          </div>
        </div>) 
          : 
          (
            <div>
              <h2>Oops... This subBreaddit doesn't exist</h2>
              <p>SubBreaddits are case sensitive. Please be sure to use correct capitalisation that matches the subreddit and no spaces in your search </p>
              <p>For Example:</p>
              <ul>
                <li>"callofduty"  -&gt;  "CallOfDuty"</li>
                <li>"Netflix"  -&gt;  "netflix"</li>
              </ul>
            </div>
          )}
      </div>
    );
}