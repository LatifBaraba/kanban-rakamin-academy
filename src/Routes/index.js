import { createBrowserRouter, useRoutes } from 'react-router-dom'
import MainLayout from '../Layouts/index'
import Home from '../Pages/home'

const MainRoutes = () => {
    let routes = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            // children: [{ index: true, element: <Home /> }],
        },
    ])
    return routes

    
}

export default MainRoutes
