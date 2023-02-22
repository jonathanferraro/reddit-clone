import React from 'react';
import '../App.css';
import { BrowserRouter as Router,
  Route,
  Routes, 
  NavLink
} from 'react-router-dom';
import SearchBar from '../features/search/search';
import ContentFeed from '../features/content-feed/ContentFeed';
import NightMode from '../components/night-mode/NightMode';
import SubredditBar from '../components/subreddit-bar/subreddit-bar';

function App() {
  return (
    <div className="App">
      <nav className='nav-bar'>
        <div>
          <p>image</p>
          <p>Breaddit</p>
        </div>
        <SearchBar />
        <NightMode />
      </nav>
      <main>
        <ContentFeed />
        <SubredditBar />
      </main>
    </div>
  );
}

export default App;
