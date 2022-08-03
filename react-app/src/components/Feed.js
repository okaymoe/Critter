import React, { useState, useEffect } from "react";
import "./Feed.css";

function Feed() {
  const [creets, setCreets] = useState([]);

  

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Feed</h2>
      </div>
    </div>
  );
}

export default Feed;
