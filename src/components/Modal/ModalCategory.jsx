/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import CategoryContext from '../../context/category/categoryContext'
import { createCategory } from '../../services/category';
import Swal from 'sweetalert2'

export const ModalCategory = ({ showModalCategory, handleCloseModalCategoy }) => {

    const [category, setCategory] = useState({
        name: ''
    });
    const { name } = category;
    const categoryContext = useContext(CategoryContext);
    const { getCategories, categories } = categoryContext;
    useEffect(() => {
        getCategories()
    }, []);

    const handleChange = ({ target: { name, value, type } }) => {
        setCategory({
            ...category,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name === '') {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
            })
        }
        if (categories.filter((item) => item.name.toUpperCase() === category.name.toUpperCase())[0]) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There is already a category with the same name',
            })
        } else {
            const response = await createCategory(category);
            getCategories()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Category created successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }
        handleCloseModalCategoy()
    }

    return (
        <Modal show={showModalCategory} onHide={handleCloseModalCategoy}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Category name</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name='name'
                            value={name}
                            type="text"
                            placeholder='Enter category name'
                        />
                    </Form.Group>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalCategoy}>
                    Close
                </Button>
                <Button variant="success" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
