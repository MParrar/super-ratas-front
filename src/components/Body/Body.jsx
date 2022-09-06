import React from 'react'
import './body.css'

export const Body = ({ children }) => {
    return (
        <div className='body__super__ratas'>
            <div className='container__super__ratas'>
                {children}
            </div>
        </div>
    )
}
