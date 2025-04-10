import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Heading from './Heading'
import Login from './Login'
import UserBit from '../../Components/UserBit'
import { useDispatch, useSelector } from 'react-redux'
import feedData from '../../../assets/js/feedData'

export default function UserProfile() {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();   // To set Global variable setUser

    const user = useSelector((state) => state.userReducer.user);
    // const user = feedData[0].user;
    console.log(user);

    const handleLogout = () => {       
        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Reset Redux state
        dispatch(clearUser());

        navigate("/")
    }

  return (
    <>
        <Link to={"/"}>
            <Heading isSmol={true}/>
        </Link>
        {(user === null)
            ? 
            <Login />
            : 
            <>
                <UserBit user={user}/>
                <button
                    className='button-style'
                    onClick={handleLogout}
                >Logout</button>
                <Link to={"newPost"} className='button-style' >Post</Link>
            </>
        }        
    </>
  )
}
