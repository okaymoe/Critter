import React from 'react';
import "./Home.css"
import Sidebar from './Sidebar';
import Feed from './Feed';
import Extras from './Extras'

const Home = () => {
    return (
      <div className="home">
        <Sidebar/>
        <Feed/>
        <Extras/>
      </div>
    );
  }
  
  export default Home;