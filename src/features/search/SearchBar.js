import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearch } from './searchSlice';

export default function SearchBar () {
    const [searchTerm, setSearchTerm] = useState('Type a /b subreaddit here')
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleFocus = () => {
        setSearchTerm('')
    }

    const onSearchHandler = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchTerm))
    }

    return (
        <div>
            <form onSubmit={onSearchHandler} className='search-form'>
                <input type='text' className='search'  value={searchTerm} onChange={handleChange} onFocus={handleFocus}/>
                <button type='submit' className='search-button'>
                    🔎
                </button>
            </form>
        </div>
    )
}


