import React from 'react';
import '../App.css';
import SearchBar from '../features/search/SearchBar';
import ContentFeed from '../features/content-feed/ContentFeed';
import NightMode from '../components/night-mode/NightMode';
import SubredditBar from '../components/subreddit-bar/subreddit-bar';
import breadImage from './clipart1357135.png';

function App() {
  return (

    <div className="App">
      <nav className='nav-bar'>
        <div className='brand'>
          <img src={breadImage}/>
          <p>Breaddit</p>
        </div>
        <SearchBar />
        <NightMode />
      </nav>
      <main>
        <SubredditBar />
        <div className='wrapper'>
          <ContentFeed />
        </div>
      </main>
    </div>

  );
}

export default App;
