import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../comments/Comments";
import { fetchCommentsAsyncThunk} from "../comments/commentsSlice";
import { selectSearch } from "../search/searchSlice";

export default function TextPost(props) {
    const {title, author, selftext, id} = props;
    const dispatch = useDispatch();
    const [showComments, setShowComments] = useState(false);
    const subreddit = useSelector(selectSearch);


    const handleClick = () => {
        setShowComments(!showComments)
        dispatch(fetchCommentsAsyncThunk({subreddit: subreddit, postId: id}))
    }

    return (
        <div className="post-text-tile">
            <h1>{title}</h1>
            <h4>{author}</h4>
            <p>{selftext}</p>
            <button onClick={handleClick}>
                Comments
            </button>
            {showComments && 
                <Comments id={id}/>
            }
        </div>
    )
}