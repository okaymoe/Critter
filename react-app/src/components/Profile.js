import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Extras from './Extras.js';
import ProfileInfo from './ProfileInfo.js';
import Sidebar from './Sidebar/Sidebar.js'
import './Profile.css'
import UsersCreets from './UsersCreets';

function Profile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile">
      <div>
        <Sidebar/>
      </div>
      <div className="profilecontent">
        <ProfileInfo userId={userId}/>
        <UsersCreets userId={userId}/>
      </div>

      <div>
        <Extras/>
      </div>
    </div>
  );
}
export default Profile;
