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
        <div className='subreddit-bar overflow-scroll overflow-y-hidden'>
            <h1>Recommended SubBreaddits</h1>
            <div className='subreddit-bar-items '>
                <div className='subreddit-bar-item ml-5'> <button value='memes' onClick={handleClick}> b/memes</button></div>
                <div className='subreddit-bar-item'> <button value='funny' onClick={handleClick}> b/funny</button></div>
                <div className='subreddit-bar-item'> <button value='pics' onClick={handleClick}> b/pics</button></div>
                <div className='subreddit-bar-item'> <button value='AskReddit' onClick={handleClick}> b/AskReddit</button></div>
                <div className='subreddit-bar-item'> <button value='facepalm' onClick={handleClick}>b/facepalm</button></div>
                <div className='subreddit-bar-item'> <button value='gaming' onClick={handleClick}> b/gaming</button></div>
                <div className='subreddit-bar-item'> <button value='mildlyinteresting' onClick={handleClick}> b/mildlyinteresting</button></div>
                <div className='subreddit-bar-item'> <button value='worldnews' onClick={handleClick}> b/worldnews</button></div>
                <div className='subreddit-bar-item'> <button value='Damnthatsinteresting' onClick={handleClick}> b/Damnthatsinteresting</button></div>
                <div className='subreddit-bar-item'> <button value='NoStupidQuestions' onClick={handleClick}> b/NoStupidQuestions</button></div>
                <div className='subreddit-bar-item'> <button value='Minecraft' onClick={handleClick}> b/Minecraft</button></div>
                <div className='subreddit-bar-item'> <button value='bodybuilding' onClick={handleClick}> b/bodybuilding</button></div>
                <div className='subreddit-bar-item'> <button value='Watches' onClick={handleClick}> b/Watches</button></div>
                <div className='subreddit-bar-item'> <button value='terriblefacebookmemes' onClick={handleClick}> b/terriblefacebookmemes</button></div>
                <div className='subreddit-bar-item'> <button value='FORTnITE' onClick={handleClick}> b/FORTnITE</button></div>
            </div>
        </div>
    )
}