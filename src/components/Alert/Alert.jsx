import React from 'react'
import { Alert } from 'react-bootstrap';

export const NotificationError = ({ alert }) => {
    return (
        <Alert variant="danger">
            {alert}
        </Alert>
    )
}
