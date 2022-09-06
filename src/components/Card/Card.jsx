import React, { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ModalBuy } from '../Modal/ModalBuy';
import { ModalCard } from '../Modal/ModalCard';
import './card.css'

export const Card = ({ card }) => {
    const { name_category, name_user, surname_user, points, price, name_status } = card
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [showBuy, setShowBuy] = useState(false);
    const [selectedCard, setSelectedCard] = useState();

    const editCard = () => {
        setSelectedCard(card);
        setShow(true);

    }

    const seeMoreInformation = () => {
        setSelectedCard(card);
        setDisable(true);
        setShow(true);

    }

    const buyCard = () => {
        setShowBuy(true);
        setSelectedCard(card);
    }

    const handleCloseBuy = () => {
        setShowBuy(false);
        setSelectedCard();

    }
    const handleClose = () => {
        setShow(false);
        setSelectedCard();
        setDisable(false);
    }
    return (

        <>
            <div style={{ border: `${name_status === 'published' ? '4px solid green' : name_status === 'sold out' ? '4px solid blue' : '4px solid red'}` }} className='card__super_ratas' >
                <div >
                    <h4 className='card__title mt-4'>Category: {name_category}</h4>
                    <h4 className='card__title'>Owner: {name_user} {surname_user}</h4>
                    <h4 className='card__title'>Points: {points}</h4>
                    <h4 className='card__title'>Price: {price}</h4>
                    <div className='card__title mt-3'>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">See more information</Tooltip>}>
                            <span className="d-inline-block">
                                <Button onClick={() => seeMoreInformation()} variant='info' size='sm'>
                                    S
                                </Button>
                            </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Buy card</Tooltip>}>
                            <span className="d-inline-bloc m-2">
                                <Button onClick={() => buyCard()} variant='success' size='sm'>
                                    B
                                </Button>
                            </span>
                        </OverlayTrigger>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Edit card</Tooltip>}>
                            <span className="d-inline-block">
                                <Button onClick={() => editCard()} variant='warning' size='sm'>
                                    E
                                </Button>
                            </span>
                        </OverlayTrigger>
                    </div>


                </div>
            </div>
            {
                show && <ModalCard
                    show={show}
                    handleClose={handleClose}
                    selectedCard={selectedCard}
                    disable={disable}
                    setDisable={setDisable}
                />
            }

            {
                showBuy && <ModalBuy
                    showBuy={showBuy}
                    handleCloseBuy={handleCloseBuy}
                    selectedCard={selectedCard}
                />
            }
        </>
    )
}
