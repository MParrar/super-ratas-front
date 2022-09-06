import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import CardContext from '../../context/card/cardContext';
import UserContext from '../../context/user/userContext'
import CategoryContext from '../../context/category/categoryContext'
import { createCard, editCard } from '../../services/card';

let initialCard = {
    category_id: '',
    created_date: new Date(),
    observation: "",
    points: '',
    price: '',
    status_id: 1,
    user_id: 3
}
export const ModalCard = ({ show, handleClose, selectedCard, disable = false }) => {

    const [card, setCard] = useState(selectedCard ? selectedCard : initialCard);
    const { price, points, observation, category_id, phone_number, email, address } = card;
    const cardContext = useContext(CardContext);
    const { getCards } = cardContext;

    const userContext = useContext(UserContext);
    const { getUsers } = userContext;

    const categoryContext = useContext(CategoryContext);
    const { getCategories, categories } = categoryContext;

    useEffect(() => {
        getCategories()
    }, []);

    const handleChange = ({ target: { name, value, type } }) => {
        console.log(name, value, type)
        if (type === 'number') value = Number(value);
        setCard({
            ...card,
            [name]: value,
        });
        console.log(card)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (selectedCard) {
            editCard(card)
        } else {
            createCard(card)

        }
        getCards()
        handleClose()
    }

    return (

        card &&
        (<Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>{selectedCard ? 'Edit card' : 'Add new card'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                name='price'
                                value={price}
                                type="number"
                                disabled={disable}
                                placeholder="Enter price" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Points</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                value={points}
                                name='points'
                                type="number"
                                disabled={disable}
                                placeholder="Enter points" />
                        </Form.Group>
                    </Row>
                    {
                        disable &&
                        <>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        value={phone_number}
                                        type="number"
                                        disabled={disable}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        onChange={handleChange}
                                        value={email}
                                        type="email"
                                        disabled={disable}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        value={address}
                                        type="text"
                                        disabled={disable}
                                    />
                                </Form.Group>
                            </Row>
                        </>
                    }
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                disabled={disable}
                                placeholder="Enter owner" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name='category_id'
                                disabled={disable}
                                onChange={handleChange}
                                value={category_id}
                            >
                                <option value="">-- Select a category --</option>
                                {
                                    categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>

                                    ))
                                }

                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">

                        <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Observation</Form.Label>
                            <Form.Control
                                name='observation'
                                disabled={disable}
                                onChange={handleChange}
                                value={observation}
                                as="textarea" rows={3} />
                        </Form.Group>

                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {!disable && <Button
                    variant="success"
                    onClick={handleSubmit}>
                    Save Changes
                </Button>}
            </Modal.Footer>
        </Modal>)

    )
}