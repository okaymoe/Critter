import './ViewComment.css';
import React from 'react'
import SideBar from './Sidebar/Sidebar';
import OneComment from './Comments/OneComment';
import Extras from './Extras';


const ViewComment = () => {
    return (
        <div className="home">
          <SideBar/>
          <OneComment/>
          <Extras/>
        </div>
      );
}

export default ViewComment
