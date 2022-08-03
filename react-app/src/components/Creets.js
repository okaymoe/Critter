import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react'



const Queets = () => {

    const users = useSelector(state => state.user);
    const sessionUser = useSelector(state => state.session?.user);
    const creets = useSelector(state => state.creet);

    return (
        <div className="creets-wrap">
            <h2>This is a creet</h2>
        </div >
    )
}

export default Queets
