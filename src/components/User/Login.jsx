/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/user/userContext';
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import './login.css'
import { NotificationError } from '../Alert/Alert';

export const Login = () => {

    const navigate = useNavigate();

    const [userFound, setUserFound] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const { email, password } = userFound;

    const userContext = useContext(UserContext);
    const { login, authenticated, message } = userContext;

    useEffect(() => {
        if (authenticated) {
            navigate('/')
        }
    }, [authenticated]);   // eslint-disable-next-line react-hooks/exhaustive-deps


    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (password === '' || email === '') {
            setError('All fields are required')
            return
        }
        await login(userFound);
    }



    const handleChange = ({ target: { name, value, type } }) => {
        setUserFound({
            ...userFound,
            [name]: value,
        });
    };

    const justSee = () => {
        navigate('/')
    }

    return (
        <div className="container2__login">

            <div className="box__login">
                <div className='contents'>
                    {(message || error) && <NotificationError
                        alert={message ? message : error}
                    />}

                    <h1>Log In</h1>
                    <hr />
                    <h2>Super Ratas</h2>
                    <Form
                        className='mt-4'

                    >
                        <Row className="mb-3">
                            <Form.Group as={Col} md={12} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    name='email'
                                    value={email}
                                    type="email"
                                    required
                                    placeholder="Your Email" />
                            </Form.Group>

                            <Form.Group as={Col} md={12} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    value={password}
                                    name='password'
                                    type="password"
                                    required
                                    placeholder="Your password" />
                            </Form.Group>
                        </Row>
                        <div className='center_buttons'>
                            <Button
                                style={{ margin: '0 auto' }}
                                variant='secondary'
                                size='sm m-3'
                                onClick={onSubmit}
                            >
                                Login
                            </Button>
                            <Button
                                style={{ margin: '0 auto' }}
                                variant='secondary'
                                size='sm m-3'
                                onClick={justSee}
                            >
                                I just want to see
                            </Button>
                        </div>
                    </Form>
                </div>



            </div>
        </div>
    )
}
