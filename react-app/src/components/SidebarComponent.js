import React from 'react'
import "./SidebarComponent.css"
import Icon from '@mui/material/Icon'
import SvgIcon from '@mui/material/SvgIcon';

const SidebarComponent = ({text, Icon}) => {
    return (
        <div className="sidebar-choice">
            {Icon}
            <h2>{text}</h2>
        </div>
    );
}

export default SidebarComponent