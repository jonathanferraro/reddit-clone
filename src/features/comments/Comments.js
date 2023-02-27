import React from "react";
import { useSelector } from "react-redux";
import { selectComments } from "./commentsSlice";

export default function Comments(props) {
    const {id} = props;
    // const id = '11cs6lm'
    const allComments = useSelector(selectComments)
    const comments = allComments[id]

    
    return (
        <div>
            {comments && comments.map(comment => (
                <p>{comment}</p>
            ))}



        </div>
    )
}



