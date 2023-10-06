import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../comments/Comments";
import { fetchCommentsAsyncThunk} from "../comments/commentsSlice";
import { selectSearch } from "../search/searchSlice";

export default function TextPost(props) {
    const {title, author, selftext, id, score, created_utc} = props;
    const dispatch = useDispatch();
    const [showComments, setShowComments] = useState(false);
    const subreddit = useSelector(selectSearch);


    const handleClick = () => {
        setShowComments(!showComments)
        dispatch(fetchCommentsAsyncThunk({subreddit: subreddit, postId: id}))
    }

    const convertPostCreatedDate = (date) => {
        const createdTimestamp = date; // Replace this with the actual "created_utc" value from the Reddit API response
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
        <div className="post-text-tile">
            <div className="post-title  ">
                <div className="justify-self-start  flex flex-col">
                    <svg className="hover:text-green-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="rotate(180 12 12)"><path fill="currentColor" d="M21.886 5.536A1.002 1.002 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13a.998.998 0 0 0 1.644 0l9-13a.998.998 0 0 0 .064-1.033zM12 17.243L4.908 7h14.184L12 17.243z"/></g></svg>
                    <p className="post-votes hover:cursor-default ">{score}</p>
                    <svg className="hover:text-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.886 5.536A1.002 1.002 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13a.998.998 0 0 0 1.644 0l9-13a.998.998 0 0 0 .064-1.033zM12 17.243L4.908 7h14.184L12 17.243z"/></svg>
                </div>
                <div>
                    <h1 className="justify-self-center pr-5">{title}</h1>
                    <h4>{author}</h4>
                </div>
                <p className=" justify-self-end text-sm">Posted {convertPostCreatedDate(created_utc)}</p>
            </div>
            
            <p className="pt-4">{selftext}</p>
            <button className="show-comments-button" onClick={handleClick}>
                Comments
            </button>
            {showComments && 
                <Comments id={id}/>
            }
        </div>
    )
}