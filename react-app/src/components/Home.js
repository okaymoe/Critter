import React from 'react';
import "./Home.css"
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed';
import Extras from './Extras'

const Home = () => {
    return (
      <div className="profile">
      <div>
        <Sidebar/>
      </div>
      
      <div className="profilecontent">
        <Feed/>
      </div>

      <div>
        <Extras/>
      </div>
    </div>
    );
  }
  
  export default Home;