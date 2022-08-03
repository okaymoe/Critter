import React, { useState, useEffect } from "react";
import Creets from "./Creets";
import "./Feed.css";

function Feed() {

  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home</h2>
      </div>
      <Creets/>
      

    </div>
  );
}

export default Feed;
