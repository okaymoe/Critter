import React from 'react';
import './Sidebar.css';
import HomeIcon from '@mui/icons-material/Home';
import SidebarComponent from './SidebarComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarComponent text="Home" Icon={<HomeIcon/>}/>
            <SidebarComponent text="Profile" Icon={<AccountCircleIcon/>}/>
            <SidebarComponent/>

            <Button variant="outlined" className="sidebar-creet" fullWidth>
                Creet
            </Button>
        </div>
    );
}

export default Sidebar