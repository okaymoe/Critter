import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react'
import {getCreets} from '../store/creets'
import { authenticate } from '../store/session';


const Creets = () => {
    const dispatch = useDispatch();
    // const users = useSelector(state => state.user);
    const creets = useSelector(state => state.creet);
    const creetsArr = Object.values(creets)
    const sessionUser = useSelector(state => state.session?.user);
    console.log(creets, "fkdslfjlsdkfjs")




    useEffect(() => {
        (async () => {
          await dispatch(authenticate());
          await dispatch(getCreets());
        })();
      }, [dispatch]);

    return (
        <>
        <div>
            {creetsArr.map((creet) => {
                return (
                    <div key={creet.id}>
                        {creet.content}
                    </div>
                )
            })}
            </div>
        </>
    )
}

export default Creets
