import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import CardContext from '../../context/card/cardContext';
import { changeStatusCard } from '../../services/card';
import Swal from 'sweetalert2';

export const ModalDeleteCard = ({ showDeleteCard, handleCloseDeleteCard, selectedCard }) => {
    const { name_category, points } = selectedCard;


    const cardContext = useContext(CardContext);
    const { getCards } = cardContext;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await changeStatusCard({
            id: selectedCard.id,
            status_id: 3,
            updated_date: new Date()
        })
        getCards();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Card deleted successfully',
            showConfirmButton: false,
            timer: 1500
        })
        handleCloseDeleteCard();
    }
    return (
        <Modal show={showDeleteCard} onHide={handleCloseDeleteCard}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>are you sure you want to delete {name_category} with {points} points ?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteCard}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
