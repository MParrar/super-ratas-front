import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import CardContext from '../../context/card/cardContext';
import CategoryContext from '../../context/category/categoryContext'
import { ModalCard } from '../Modal/ModalCard';
import { ModalCategory } from '../Modal/ModalCategory';
import './browser.css'
export const Browser = () => {

    const [show, setShow] = useState(false);
    const [showModalCategory, setShowModalCategory] = useState(false);

    const cardContext = useContext(CardContext);
    const { getCards, getCardsByCategory } = cardContext;

    const categoryContext = useContext(CategoryContext);
    const { getCategories, categories } = categoryContext;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getCards()
        getCategories()

    }, []);

    const handleClose = () => {
        setShow(!show)
    }

    const handleCloseModalCategoy = () => {
        setShowModalCategory(false)
    }

    const filterByCategory = (category) => {
        console.log(category)
        getCardsByCategory(category)
    }
    return (
        <>
            <div className='browser__super__ratas'>
                <input />
                <Button className='m-2' onClick={() => setShow(true)}>+</Button>
                <Button className='m-2' onClick={() => setShowModalCategory(true)}>+</Button>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter by category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            categories.map((category) => (
                                <Dropdown.Item
                                    key={category.id}
                                    onClick={() => filterByCategory(category.name)}>
                                    {category.name}</Dropdown.Item>

                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>

            </div>
            {
                show && <ModalCard
                    show={show}
                    handleClose={handleClose}
                />
            }
            {
                showModalCategory && <ModalCategory
                    showModalCategory={showModalCategory}
                    handleCloseModalCategoy={handleCloseModalCategoy}
                />
            }
        </>

    )
}
