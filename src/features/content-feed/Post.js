import React from "react";
import { useSelector } from "react-redux";
import { selectPosts } from "./postsSlice";

export default function Post(props) {
    const {index} = props;
    const posts = useSelector(selectPosts)

    return (
        <div>
            <h1>{posts['1187ji9'].title}</h1>
            {'post image'}

        </div>
    )

}