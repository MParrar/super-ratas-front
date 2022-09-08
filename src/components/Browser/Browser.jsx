/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import CardContext from '../../context/card/cardContext';
import CategoryContext from '../../context/category/categoryContext'
import UserContext from '../../context/user/userContext';
import { getStatus } from '../../services/status';
import { ModalCard } from '../Modal/ModalCard';
import { ModalCategory } from '../Modal/ModalCategory';
import { AiFillCreditCard, AiFillPlusCircle, AiOutlineUserAdd } from 'react-icons/ai';
import './browser.css'
import { TableCategory } from '../Category/TableCategory';
import { ModalUser } from '../Modal/MoldaUser';
import { TableUser } from '../User/TableUser';
import { ModalInfo } from '../Modal/ModalInfo';
export const Browser = () => {

    const [show, setShow] = useState(false);
    const [showModalCategory, setShowModalCategory] = useState(false);
    const [showTableCategory, setShowTableCategory] = useState(false);
    const [showModalUser, setShowModalUser] = useState(false);
    const [showTableUser, setShowTableUser] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [execute, setExecute] = useState(false);
    const [filter, setFilter] = useState({
        status_id: null,
        category_id: null
    });
    const [status, setStatus] = useState([]);

    const cardContext = useContext(CardContext);
    const { getCards, getCardsByStatusAndCategory } = cardContext;

    const categoryContext = useContext(CategoryContext);
    const { getCategories, categories } = categoryContext;

    const userContext = useContext(UserContext);
    const { user, getUsers, users } = userContext;

    const handleChange = (type, value) => {
        setFilter({
            ...filter,
            [type]: value
        })
        setExecute(!execute)

    };

    useEffect(() => {
        getCardsByStatusAndCategory(filter)

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

    useEffect(() => {
        getUsers()
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

    const handleCloseModalUser = () => {
        setShowModalUser(false)
    }

    const handleCloseTableCategory = () => {
        setShowTableCategory(false)
    }

    const handleCloseTableUser = () => {
        setShowTableUser(false)
    }

    const handleCloseInfo = () => {
        setShowInfo(false)
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
                {user && user.role_id === 3 &&
                    <Button className='m-2'
                        style={{ background: '#19b9a7' }}
                        onClick={() => setShowModalUser(true)}><AiOutlineUserAdd size='20px' /></Button>
                }
                {user && user.role_id === 3 &&
                    <Button className='m-2'
                        style={{ background: '#19b9a7' }}
                        onClick={() => setShowTableUser(true)}>Show User Table</Button>
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
                <Button
                    onClick={() => setShowInfo(true)}
                    style={{ marginLeft: '4px' }}>Info</Button>
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

            {showModalUser && <ModalUser
                showModalUser={showModalUser}
                handleCloseModalUser={handleCloseModalUser}
            />
            }

            {
                showTableUser && <TableUser
                    showTableUser={showTableUser}
                    handleCloseTableUser={handleCloseTableUser}
                    users={users}
                    getUsers={getUsers}
                />
            }
            {showInfo && <ModalInfo
                showInfo={showInfo}
                handleCloseInfo={handleCloseInfo}
            />}
        </>

    )
}
