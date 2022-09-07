import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import CardContext from '../../context/card/cardContext';
import UserContext from '../../context/user/userContext'
import CategoryContext from '../../context/category/categoryContext'
import { createCard, editCard } from '../../services/card';
import { getBuyers } from '../../services/buyer';

let initialCard = {
    category_id: '',
    created_date: new Date(),
    observation: "",
    points: '',
    price: '',
    status_id: 1,
    user_id: ''
}
export const ModalCard = ({ show, handleClose, selectedCard, disable = false }) => {

    const [card, setCard] = useState(selectedCard ? selectedCard : initialCard);
    const [buyer, setBuyer] = useState({});
    const { price, points, observation, category_id, phone_number, email, address } = card;
    const cardContext = useContext(CardContext);
    const { getCards } = cardContext;

    const userContext = useContext(UserContext);
    const { user, getUsers, users } = userContext;

    const categoryContext = useContext(CategoryContext);
    const { getCategories, categories } = categoryContext;

    useEffect(() => {
        if (card?.status_id === 2) {
            getAllBuyer({
                card_id: card.id,
                user_id: user.id
            });

        }
        getCategories();
        setCard({
            ...card,
            user_id: user.id
        });
    }, []);

    const getAllBuyer = async (buyer) => {
        setBuyer(await getBuyers(buyer));

    }
    const handleChange = ({ target: { name, value, type } }) => {
        if (type === 'number') value = Number(value);
        setCard({
            ...card,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        if (selectedCard) {
            editCard(card)
            getCards()

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
                <Modal.Title>{disable ? 'See more information' : selectedCard ? 'Edit card' : 'Add new card'}</Modal.Title>
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
                        {
                            card.status_id === 2 &&
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Buyer</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={buyer[0]?.user_name}
                                    readOnly
                                />
                            </Form.Group>
                        }

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
