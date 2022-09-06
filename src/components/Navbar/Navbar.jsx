import React from 'react'
import { useNavigate } from 'react-router-dom'
import './navbar.css'

export const Navbar = () => {

    let navigate = useNavigate()
    const login = () => {
        navigate('login')
    }
    return (
        <div className='header'>

            <span className='title'></span>
            <h1 className='title'>Super Ratas</h1>
            <button
                onClick={() => login()}
                className='button__sesion'>
                <h6 className='session_letter'>Log In
                </h6></button>

        </div>
    )
}
