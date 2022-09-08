import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import CardContext from '../../context/card/cardContext';
import CategoryContext from '../../context/category/categoryContext'
import UserContext from '../../context/user/userContext';
import { getStatus } from '../../services/status';
import { ModalCard } from '../Modal/ModalCard';
import { ModalCategory } from '../Modal/ModalCategory';
import { AiFillCreditCard, AiFillPlusCircle } from 'react-icons/ai';
import './browser.css'
import { TableCategory } from '../Category/TableCategory';
export const Browser = () => {

    const [show, setShow] = useState(false);
    const [showModalCategory, setShowModalCategory] = useState(false);
    const [showTableCategory, setShowTableCategory] = useState(false);
    const [execute, setExecute] = useState(false);
    const [filter, setFilter] = useState({
        status_id: null,
        category_id: null
    });
    const [status, setStatus] = useState([]);

    const cardContext = useContext(CardContext);
    const { getCards, getCardsByCategory, getCardsByStatus } = cardContext;

    const categoryContext = useContext(CategoryContext);
    const { getCategories, categories } = categoryContext;

    const userContext = useContext(UserContext);
    const { user } = userContext;

    const handleChange = (type, value) => {
        setFilter({
            ...filter,
            [type]: value
        })
        setExecute(!execute)

    };

    useEffect(() => {
        getCardsByStatus(filter)

    }, [execute]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getCards();
    }, []);

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getStatusList()
    }, []);

    const handleClose = () => {
        setShow(!show);
    }

    const getStatusList = async () => {
        setStatus(await getStatus());

    }
    const handleCloseModalCategoy = () => {
        setShowModalCategory(false);
    }

    const filterByCategory = (category) => {
        getCardsByCategory(category);
    }

    const filterByStatus = (status) => {
        getCardsByStatus(status);
    }

    const handleCloseTableCategory = () => {
        setShowTableCategory(false)
    }
    return (
        <>
            <div className='browser__super__ratas'>
                {user &&
                    <Button className='m-2'
                        style={{ background: '#DD4828' }}
                        onClick={() => setShow(true)}>
                        <AiFillCreditCard
                            size={'21px'}
                        /></Button>}
                {user && user.role_id === 3 &&
                    <Button className='m-2'
                        style={{ background: '#DDA628' }}
                        onClick={() => setShowModalCategory(true)}><AiFillPlusCircle size='20px' /></Button>
                }
                {user && user.role_id === 3 &&
                    <Button className='m-2'
                        style={{ background: '#DDA628' }}
                        onClick={() => setShowTableCategory(true)}>Show Category Table</Button>
                }
                <Dropdown className='m-1'>
                    <Dropdown.Toggle
                        variant="secondary" id="dropdown-basic">
                        Filter by category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            categories.map((category) => (
                                <Dropdown.Item
                                    key={category.id}
                                    name='category_id'
                                    onClick={() => handleChange('category_id', category.id)}
                                >
                                    {category.name}</Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Filter by status
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='ml-4'>
                        {
                            status.map((status) => (
                                <Dropdown.Item
                                    key={status.id}
                                    name='status_id'
                                    onClick={() => handleChange('status_id', status.id)}


                                // onClick={() => filterByStatus(status.id)}
                                >
                                    {status.name}</Dropdown.Item>

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

            {
                showTableCategory && <TableCategory
                    showTableCategory={showTableCategory}
                    handleCloseTableCategory={handleCloseTableCategory}
                    categories={categories}
                    getCategories={getCategories}
                />
            }
        </>

    )
}
