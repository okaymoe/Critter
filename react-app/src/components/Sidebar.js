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
          await dispatch(getComments());
          await dispatch(getUsers());
        })();
      }, [dispatch]);
    
    return (
        sessionUser && 
        <div className="sidebar">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                crossorigin="anonymous"
            />
            <i class="fas fa-paw"></i>
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