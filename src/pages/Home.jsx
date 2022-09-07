import React from 'react'
import { Body } from '../components/Body/Body'
import { Browser } from '../components/Browser/Browser'
import { ListCard } from '../components/Card/ListCard'
import { Navbar } from '../components/Navbar/Navbar'
import CardState from '../context/card/cardState'
import CategoryState from '../context/category/categoryState'
import UserState from '../context/user/userState'

export const Home = () => {
    return (
        <>
            <CategoryState>
                <CardState>
                    <Navbar />
                    <Browser />
                    <Body>
                        <ListCard />
                    </Body>
                </CardState>
            </CategoryState>
        </>
    )
}
