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

    const convertPostCreatedDate = (date) => {
        const createdTimestamp = date; 
        const nowTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds

        const timeDifferenceInSeconds = nowTimestamp - createdTimestamp;

        // Calculate relative time
        if (timeDifferenceInSeconds < 60) {
            return(`${timeDifferenceInSeconds} seconds ago`);
        } else if (timeDifferenceInSeconds < 3600) {
            const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
            return(`${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`);
        } else if (timeDifferenceInSeconds < 86400) {
            const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
            return(`${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`);
        } else {
            const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
            return(`${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`);
        }
    }
    
    return (
        <div>
            {comments && comments.map(comment => (
                <div className="post-text-comment-tile post-text-comments grid pl-4">
                    <p className="justify-self-start pb-1 underline">{comment.author} - {convertPostCreatedDate(comment.created_utc)}</p>
                    <p className="justify-self-start text-left">{comment.comment}</p>
                </div>
            ))}
        </div>
    )
}



