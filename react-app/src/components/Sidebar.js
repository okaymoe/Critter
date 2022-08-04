import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SidebarComponent from './SidebarComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCreets } from '../store/creets';
import { getComments } from '../store/comments';
import { getUsers } from '../store/users';
import { authenticate } from '../store/session';
import { useSelector } from 'react-redux';


const Sidebar = () => {

    // const users = useSelector(state => state.user);
    const sessionUser = useSelector(state => state.session?.user);
    const creets = useSelector(state => state.creet);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
          await dispatch(authenticate());
          await dispatch(getCreets());
        //   await dispatch(getComments());
          await dispatch(getUsers());
        })();
      }, [dispatch]);
    
    return (
        sessionUser && 
        <div className="sidebar">
            <BugReportIcon className="critter-logo"/>
            <NavLink style={{textDecoration: 'none'}}id="profilenav" to='/'> 
            <SidebarComponent className="homeicon" text="Home" Icon={<HomeIcon/>}/>
            </NavLink>
            
            <NavLink style={{textDecoration: 'none'}} id="profilenav" to={`/users/${sessionUser.id}`}> 
            <SidebarComponent text="Profile" Icon={<AccountCircleIcon/>}/>
            </NavLink>
        

            <Button variant="outlined" className="sidebar-creet" fullWidth>
                Creet
            </Button>
        </div>
    );
}

export default Sidebar