import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { AiFillEdit, AiFillSave, AiFillDelete } from 'react-icons/ai';
import { deleteUser, editUser } from '../../services/user';

export const TableUser = ({ showTableUser, handleCloseTableUser, users, getUsers }) => {
    const [userSelected, setUserSelected] = useState({
        name: '',
        surname: '',
        email: "",
        phone_number: '',
        role_id: '',
        address: '',
        password: '',

    });

    const handleEdit = (user) => {
        setUserSelected(user)
    }

    const handleChange = ({ target: { name, value, type } }) => {
        setUserSelected({
            ...userSelected,
            [name]: value,
        });
    };

    const handleSave = async () => {
        // e.preventDefault();
        if (users.filter((item) => item.email.toUpperCase() === userSelected.email.toUpperCase())[0]
        ) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There is already a email with the same name',
            })
        }
        await editUser(userSelected)
        getUsers()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User edited successfully',
            showConfirmButton: false,
            timer: 1500
        })

    }

    const handleDelete = async (user) => {
        await deleteUser(user)
        getUsers()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User delelted successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }
    return (
        <Modal show={showTableUser} size='xl' onHide={handleCloseTableUser}>
            <Modal.Header closeButton>
                <Modal.Title>Users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) =>
                            (<tr key={user.id}>
                                <td >
                                    {i + 1}
                                </td>
                                <td>

                                    <Form.Control
                                        onChange={handleChange}
                                        name='name'
                                        disabled={userSelected.id === user.id ? false : true}
                                        value={userSelected.id === user.id ? userSelected.name : user.name}
                                        type="text"
                                    />

                                </td>
                                <td>

                                    <Form.Control
                                        onChange={handleChange}
                                        name='email'
                                        disabled={userSelected.id === user.id ? false : true}
                                        value={userSelected.id === user.id ? userSelected.email : user.email}
                                        type="text"
                                    />

                                </td>
                                <td>

                                    <Form.Control
                                        onChange={handleChange}
                                        name='password'
                                        disabled={userSelected.id === user.id ? false : true}
                                        value={userSelected.id === user.id ? userSelected.password : user.password}
                                        type="password"
                                    />

                                </td>
                                {userSelected.id === user.id ?
                                    <td className='text-center' onClick={() => handleSave()}>
                                        <AiFillSave size={'20px'} />
                                    </td>
                                    :
                                    <td className='text-center' onClick={() => handleEdit(user)}>
                                        <AiFillEdit size='20px' />
                                    </td>
                                }

                                <td className='text-center' onClick={() => handleDelete(user)}>
                                    <AiFillDelete size='20px' />
                                </td>
                            </tr>)
                            )
                        }

                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseTableUser}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
