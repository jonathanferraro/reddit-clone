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
      <nav className='nav-bar flex items-center'>
        <div className='flex-shrink-0 brand flex mb-3 lg:mb-0'>
          <img className='-mt-1 lg:-mt-0' src={breadImage}/>
          <p className='' >Breaddit</p>
        </div>
        <div className='flex-grow text-center -ml-14'>
          <SearchBar/>
        </div>

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
