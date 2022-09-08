import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';
import CardContext from '../../context/card/cardContext';
import UserContext from '../../context/user/userContext';
import { buyCard, changeStatusCard } from '../../services/card';


export const ModalBuy = ({ showBuy, handleCloseBuy, selectedCard }) => {
    const { price, points } = selectedCard;

    const userContext = useContext(UserContext);
    const { user } = userContext;

    const cardContext = useContext(CardContext);
    const { getCards } = cardContext;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await buyCard({
            user_id: user.id,
            card_id: selectedCard.id
        });
        if (data) {
            changeStatusCard({
                id: selectedCard.id,
                status_id: 2,
                updated_date: new Date()
            })
        }
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Card buyed successfully',
            showConfirmButton: false,
            timer: 1500
        })
        getCards();
        handleCloseBuy();
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
