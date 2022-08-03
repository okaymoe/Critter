import React from "react"
import './Sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import SidebarComponent from "./SidebarComponent"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarComponent text="Home" Icon={<HomeIcon/>}/>
            <SidebarComponent text="Profile" Icon={<AccountCircleIcon/>}/>
            <SidebarComponent/>
        </div>
    );
}

export default Sidebar