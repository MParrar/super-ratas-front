import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './modalInfo.css'

export const ModalInfo = ({ showInfo, handleCloseInfo }) => {
    return (
        <Modal show={showInfo} onHide={handleCloseInfo}>
            <Modal.Header closeButton>
                <Modal.Title>Color information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    <li className='color__published'>
                        <span className='letter_info'>Published</span>
                    </li>
                    <li className='color__sold_out'>
                        <p className='letter_info'>Sold out</p>
                    </li>
                    <li className='color__erased'>
                        <span className='letter_info'>Erased</span>
                    </li>

                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseInfo}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>)
}
