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
          <div className="flex justify-between">
            <svg className="carousel-button-left hover:cursor-pointer ml-8 mt-3" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><g transform="rotate(-90 6 6)"><path fill="currentColor" d="M6 10.5a.75.75 0 0 0 .75-.75V3.81l1.97 1.97a.75.75 0 0 0 1.06-1.06L6.53 1.47a.75.75 0 0 0-1.06 0L2.22 4.72a.75.75 0 1 0 1.06 1.06l1.97-1.97v5.94c0 .414.336.75.75.75Z"/></g></svg>
            {/* <button className="carousel-button-left  border-4 rounded-2xl py-1 px-4 mr-4" >Left</button> */}
            {/* <button className="carousel-button-right border-4 rounded-2xl py-1 px-3 mt-4">Right</button> */}
            <svg className="carousel-button-right hover:cursor-pointer mr-8 mt-3" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12 12"><g transform="rotate(90 6 6)"><path fill="currentColor" d="M6 10.5a.75.75 0 0 0 .75-.75V3.81l1.97 1.97a.75.75 0 0 0 1.06-1.06L6.53 1.47a.75.75 0 0 0-1.06 0L2.22 4.72a.75.75 0 1 0 1.06 1.06l1.97-1.97v5.94c0 .414.336.75.75.75Z"/></g></svg>
          </div>

          <div className="post-text-container">

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
              <p>SubBreaddits are case sensitive. Please be sure to use correct capitalization that matches the subreddit and no spaces in your search </p>
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