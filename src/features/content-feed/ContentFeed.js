import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPostsAsyncThunk } from "./postsSlice";

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
            <p>test</p>
            <div className="post-container">
                {posts.map(post => (
                    post.post_hint === 'image' &&
                    <div key={post.id} className='post-tile'>
                        <h1>{post.title}</h1>
                        <img src={post['url_overridden_by_dest']} />
                        <h4>{post['author']}</h4>
                    </div>
                ))}
            </div>
            <button class="carousel-button carousel-button-left">Left</button>
            <button class="carousel-button carousel-button-right">Right</button>

            <div className="post-text-container">
                {posts.map(post => (
                        post.post_hint === undefined &&
                        <div key={post.id} className='post-text-tile'>
                            <h1>{post.title}</h1>
                            <h4>{post['author']}</h4>
                            <p>{post['selftext']}</p>
                        </div>
                ))}
            </div>
            
        </div>
    )
}