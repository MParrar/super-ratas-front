import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { buyCard, changeStatusCard } from '../../services/card';

export const ModalBuy = ({ showBuy, handleCloseBuy, selectedCard }) => {
    const { price, points } = selectedCard;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await buyCard({
            user_id: 4,
            card_id: selectedCard.id
        });
        console.log(data)
        if (data) {
            changeStatusCard({
                id: selectedCard.id,
                status_id: 3,
                updated_date: new Date()
            })
        }
        handleCloseBuy()
    }
    return (
        <Modal show={showBuy} onHide={handleCloseBuy}>
            <Modal.Header closeButton>
                <Modal.Title>Buy Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>are you sure you want to pay ${price} for {points} points ?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBuy}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Buy
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
