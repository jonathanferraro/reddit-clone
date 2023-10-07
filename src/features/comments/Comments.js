import React from "react";
import { useSelector } from "react-redux";
import { selectComments, selectIsLoadingComments } from "./commentsSlice";

export default function Comments(props) {
    const {id} = props;
    const allComments = useSelector(selectComments)
    const comments = allComments[id]
    const isLoading = useSelector(selectIsLoadingComments);

    if (isLoading) {
        return <div>Loading Comments...</div>
    }
    
    return (
        <div>
            {comments && comments.map(comment => (
                <div className="post-text-comment-tile">
                    <p >CoolUserName123 - 6 hours ago</p>
                    <p className="post-text-comments">{comment}</p>
                </div>
            ))}
        </div>
    )
}



