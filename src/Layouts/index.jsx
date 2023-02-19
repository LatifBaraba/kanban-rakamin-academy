import React from 'react'
import Header from '../Components/header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {

    return (
        <div className='min-h-screen'>
            <Header />
            <Outlet />
        </div>
    )
}

export default MainLayout
