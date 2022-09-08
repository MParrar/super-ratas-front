import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/userContext'
import './navbar.css'

export const Navbar = () => {

    let navigate = useNavigate()

    const userContext = useContext(UserContext);
    const { user, logout } = userContext;
    const login = () => {
        if (user) {
            logout();
        }
        navigate('login')

    }
    return (
        <div className='header'>

            <h6 className='title' style={{marginTop:'10px'}}>Hi ratita {`${(user) ? user?.name : ''}!!!`}</h6>
            <h1 className='title'>Super Ratas</h1>
            <button
                onClick={() => login()}
                className='button__sesion'>
                <h6 className='session_letter'>{
                    user ? 'Log out' : 'Log In'
                }
                </h6></button>

        </div>
    )
}
