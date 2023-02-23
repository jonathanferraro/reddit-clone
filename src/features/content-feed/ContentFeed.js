import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, fetchPostsAsyncThunk } from "./postsSlice";

export default function ContentFeed() {
    const dispatch = useDispatch()
    const posts = useSelector(selectPosts)

    useEffect(() => {
        dispatch(fetchPostsAsyncThunk());
    }, [dispatch]);


    return(
        <div className="post-container">
            {posts.map(post => (
                <div key={post.id} className='post-tile'>
                    <h1>{post.title}</h1>
                    <h4>{post['author']}</h4>
                    <img src={post['url_overridden_by_dest']} />
                </div>
            ))}
        </div>
    )
}