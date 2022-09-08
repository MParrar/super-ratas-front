import React, { useState } from 'react'
import { Button, Col, Form, Modal, Table } from 'react-bootstrap'
import { editCategory, deleteCategory } from '../../services/category';
import Swal from 'sweetalert2'
import { AiFillEdit, AiFillSave, AiFillDelete } from 'react-icons/ai';

export const TableCategory = ({ showTableCategory, handleCloseTableCategory, categories, getCategories }) => {
    const [categorySelected, setCategorySelected] = useState({
        id: '',
        name: ''
    });

    const handleEdit = (category) => {
        setCategorySelected(category)
    }

    const handleChange = ({ target: { name, value, type } }) => {
        setCategorySelected({
            ...categorySelected,
            [name]: value,
        });
    };

    const handleSave = async () => {
        // e.preventDefault();
        if (categories.filter((item) => item.name.toUpperCase() === categorySelected.name.toUpperCase())[0]
        ) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There is already a category with the same name',
            })
        }
        await editCategory(categorySelected)
        getCategories()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Category edited successfully',
            showConfirmButton: false,
            timer: 1500
        })

    }

    const handleDelete = async (category) => {
        await deleteCategory(category)
        getCategories()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Category delelted successfully',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (

        <Modal show={showTableCategory} size='xl' onHide={handleCloseTableCategory}>
            <Modal.Header closeButton>
                <Modal.Title>Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, i) =>
                            (<tr key={category.id}>
                                <td >
                                    {i + 1}
                                </td>
                                <td>

                                    <Form.Control
                                        onChange={handleChange}
                                        name='name'
                                        disabled={categorySelected.id === category.id ? false : true}
                                        value={categorySelected.id === category.id ? categorySelected.name : category.name}
                                        type="text"
                                    />

                                </td>
                                {categorySelected.id === category.id ?
                                    <td className='text-center' onClick={() => handleSave()}>
                                        <AiFillSave size={'20px'} />
                                    </td>
                                    :
                                    <td className='text-center' onClick={() => handleEdit(category)}>
                                        <AiFillEdit size='20px' />
                                    </td>
                                }

                                <td className='text-center' onClick={() => handleDelete(category)}>
                                    <AiFillDelete size='20px' />
                                </td>
                            </tr>)
                            )
                        }

                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseTableCategory}>
                    Close
                </Button>
                <Button variant="success" onClick={handleCloseTableCategory}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
