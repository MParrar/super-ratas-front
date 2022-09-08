import React, { useContext } from 'react'
import CardContex from '../../context/card/cardContext'
import { Card } from './Card'
import './card.css'

export const ListCard = () => {

    const cardContext = useContext(CardContex);
    const { cards } = cardContext;
    return (
        <div className='card__container__super__ratas'>

            {
                cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                    />
                ))
            }
        </div>
    )
}
