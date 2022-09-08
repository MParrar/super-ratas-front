import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import UserContext from '../../context/user/userContext';
import { ModalBuy } from '../Modal/ModalBuy';
import { ModalCard } from '../Modal/ModalCard';
import { ModalDeleteCard } from '../Modal/ModalDeleteCard';
import { AiFillEye, AiTwotoneDelete, AiFillEdit, AiFillDollarCircle } from 'react-icons/ai';
import './card.css'

export const Card = ({ card }) => {
    const { name_category, name_user, surname_user, points, price, name_status } = card
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [showBuy, setShowBuy] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState();

    const userContext = useContext(UserContext);
    const { user } = userContext;


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

    const handleCloseDeleteCard = () => {
        setShowDeleteCard(false);
        setSelectedCard();
    }
    const handleClose = () => {
        setShow(false);
        setSelectedCard();
        setDisable(false);
    }

    const deleteCard = () => {
        setShowDeleteCard(true);
        setSelectedCard(card);
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

                        <Button
                            style={{ marginRight: '8px' }}
                            onClick={() => seeMoreInformation()}
                            variant='info' size='sm'>
                            <AiFillEye
                                size={'20px'}
                            />
                        </Button>

                        {user && user?.id === card.user_id && card.status_id === 1 &&
                            <Button
                                style={{ marginRight: '8px' }}
                                onClick={() => deleteCard()}
                                variant='danger'
                                size='sm'>
                                <AiTwotoneDelete
                                    size={'20px'}
                                />
                            </Button>
                        }


                        {user?.id === card.user_id &&
                            <Button onClick={() => editCard()} variant='warning' size='sm'>
                                <AiFillEdit
                                    size={'20px'}
                                />
                            </Button>
                        }

                        {
                            (user && user?.id !== card.user_id && card.status_id === 1) && <Button onClick={() => buyCard()} variant='success' size='sm'>
                                <AiFillDollarCircle
                                    size={'20px'}
                                />
                            </Button>
                        }
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
            {
                showDeleteCard && <ModalDeleteCard
                    showDeleteCard={showDeleteCard}
                    handleCloseDeleteCard={handleCloseDeleteCard}
                    selectedCard={selectedCard}
                />
            }
        </>
    )
}
