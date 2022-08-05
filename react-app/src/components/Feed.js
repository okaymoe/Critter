import React, { useState, useEffect } from "react";
import CreateCreet from "./Creets/CreateCreet";
// import CreetBox from "./CreetBox";
import Creets from "./Creets/Creets";
import "./Feed.css";

function Feed() {

  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home</h2>
      </div>
      <CreateCreet/>
      <Creets/>
      

    </div>
  );
}

export default Feed;
