import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { setSearch } from '../../features/search/searchSlice';


export default function SubredditBar() {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(setSearch(e.target.value))

    }

    return(
        <div className='subreddit-bar'>
            <h1>Recommended SubBreaddits</h1>
            <ul>
                <li> <button value='memes' onClick={handleClick}> b/memes</button></li>
                <li> <button value='funny' onClick={handleClick}> b/funny</button></li>
                <li> <button value='pics' onClick={handleClick}> b/pics</button></li>
                <li> <button value='AskReddit' onClick={handleClick}> b/AskReddit</button></li>
                <li> <button value='facepalm' onClick={handleClick}>b/facepalm</button></li>
                <li> <button value='gaming' onClick={handleClick}> b/gaming</button></li>
                <li> <button value='mildlyinteresting' onClick={handleClick}> b/mildlyinteresting</button></li>
                <li> <button value='worldnews' onClick={handleClick}> b/worldnews</button></li>
                <li> <button value='Damnthatsinteresting' onClick={handleClick}> b/Damnthatsinteresting</button></li>
                <li> <button value='NoStupidQuestions' onClick={handleClick}> b/NoStupidQuestions</button></li>
                <li> <button value='Minecraft' onClick={handleClick}> b/Minecraft</button></li>
                <li> <button value='bodybuilding' onClick={handleClick}> b/bodybuilding</button></li>
                <li> <button value='Watches' onClick={handleClick}> b/Watches</button></li>
                <li> <button value='terriblefacebookmemes' onClick={handleClick}> b/terriblefacebookmemes</button></li>
                <li> <button value='FORTnITE' onClick={handleClick}> b/FORTnITE</button></li>
            </ul>
        </div>
    )
}