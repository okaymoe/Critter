import './ViewCreet.css';
import React from 'react'
import SideBar from './Sidebar';
import OneCreet from './Creets/OneCreet';
import Extras from './Extras';


const ViewCreet = () => {
    return (
        <div className="home">
          <SideBar/>
          <OneCreet/>
          <Extras/>
        </div>
      );
}

export default ViewCreet
