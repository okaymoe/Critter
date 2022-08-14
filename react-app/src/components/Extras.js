import React from 'react'
import "./Extras.css"
import FactDisplay from './Extras/FactDisplay/FactDisplay';
import OtherUsers from './Extras/Others/OtherUsers';

const Extras = () => {
    return (
        <div className="extras">
            <FactDisplay/>
            <OtherUsers/>
        </div>
    );
}

export default Extras