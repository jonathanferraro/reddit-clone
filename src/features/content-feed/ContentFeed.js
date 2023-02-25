import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPostsAsyncThunk } from "./postsSlice";

import TextPost from "./TextPost";
import ImagePost from "./ImagePost";

export default function ContentFeed() {
    const dispatch = useDispatch()
    const posts = useSelector(selectPosts)

    useEffect(() => {
        dispatch(fetchPostsAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
    // get carousel container and button elements
        const carousel = document.querySelector('.post-container');
        const carouselBtnLeft = document.querySelector('.carousel-button-left');
        const carouselBtnRight = document.querySelector('.carousel-button-right');

        // calculate the width of a single post tile
        const postWidth = carousel.querySelector('.post-tile').offsetWidth;

        // add event listeners to the carousel buttons
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
    }, []);


    return(
        <div>
            <h1>test test!</h1>
            <h3>test test test</h3>
            <div className="post-container">
                {posts.map(post => (
                    post.post_hint === 'image' &&
                    <ImagePost 
                    title= {post.title}
                    author={post.author}
                    url_overridden_by_dest={post.url_overridden_by_dest}
                    id={post.id}
                    />
                ))}
            </div>
            <button class="carousel-button carousel-button-left">Left</button>
            <button class="carousel-button carousel-button-right">Right</button>

            <div className="post-text-container">
                {posts.map(post => (
                    post.post_hint === undefined &&
                    <TextPost 
                    title={post.title} 
                    author={post.author} 
                    selftext={post.selftext} 
                    id={post.id}/>
                ))}
            </div>
        </div>
    )
}