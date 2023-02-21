import React, { useState, useEffect } from 'react';

export default function SearchBar () {

    const [search, setSearch] = useState('Search')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleFocus = () => {
        setSearch('')
    }

    const onSearchHandler = (e) => {
        e.preventDefault();
        return {}
    }

    return (
        <div>
            <form onSubmit={onSearchHandler} className='search-form'>
                <input type='text' className='search'  value={search} onChange={handleChange} onFocus={handleFocus}/>
                <button type='submit' className='search-button'>
                    🔎
                </button>
            </form>
        </div>
    )
}


