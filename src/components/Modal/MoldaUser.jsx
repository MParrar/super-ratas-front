/*eslint-disable*/
import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import UserContext from '../../context/user/userContext'
import { getRole } from '../../services/role';
import Swal from 'sweetalert2'
import { createUser } from '../../services/user';

let initialUser = {
    name: '',
    surname: '',
    email: "",
    phone_number: '',
    role_id: '',
    address: '',
    password: '',
}
export const ModalUser = ({ showModalUser, handleCloseModalUser }) => {

    const [newUser, setNewUser] = useState(initialUser);
    const [role, setRole] = useState([]);
    const { name, surname, email, phone_number, role_id, address } = newUser;

    const userContext = useContext(UserContext);
    const { getUsers, users } = userContext;



    useEffect(() => {
        getUsers()
        getRoleList()
    }, []);

    const getRoleList = async () => {
        setRole(await getRole());
    }
    const handleChange = ({ target: { name, value, type } }) => {
        if (type === 'number') value = Number(value);
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name === '' || email === '' || role_id === '' || address === ''
            || phone_number === ''
        ) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
            })
        }
        if (users.filter((item) => item.email.toUpperCase() === email.toUpperCase())[0]) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There is already a email with the same name',
            })
        }
        createUser(newUser)
        getUsers()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User created successfully',
            showConfirmButton: false,
            timer: 1500
        })



        handleCloseModalUser()
    }

    return (
        (<Modal show={showModalUser} onHide={handleCloseModalUser} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{'Add new User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name='name'
                                value={name}
                                type="text"
                                placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={surname}
                                name='surname'
                                type="text"
                                placeholder="Enter surname" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>email</Form.Label>
                            <Form.Control
                                name='email'
                                type="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name='role_id'
                                onChange={handleChange}
                                value={role_id}
                            >
                                <option value="">-- Select a Role --</option>
                                {
                                    role.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>

                                    ))
                                }

                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Addres</Form.Label>
                            <Form.Control
                                name='address'
                                onChange={handleChange}
                                value={address}
                                type='text'
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                name='phone_number'
                                onChange={handleChange}
                                value={phone_number}
                                type='text'
                            />
                        </Form.Group>

                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalUser}>
                    Close
                </Button>
                <Button
                    variant="success"
                    onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>)

    )
}
