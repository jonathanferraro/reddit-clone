import React from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "./postsSlice";

export default function ImagePost(props) {
    const {title, author, url_overridden_by_dest, id} = props;
    

    return (
        <div className="post-tile">
            <h1>{title}</h1>
            <img src={url_overridden_by_dest} />
            <h4>{author}</h4>
        </div>
    )

}