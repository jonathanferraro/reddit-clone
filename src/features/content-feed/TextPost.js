import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "./postsSlice";

export default function TextPost(props) {
    const {title, author, selftext, id} = props;
    const dispatch = useDispatch();
    const [showComments, setShowComments] = useState(false);
    

    return (
        <div className="post-text-tile">
            <h1>{title}</h1>
            <h4>{author}</h4>
            <p>{selftext}</p>
            <button >Comments</button>
            {/* Comment Component Here */}

        </div>
    )

}