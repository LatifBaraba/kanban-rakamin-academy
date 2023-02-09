import { useRoutes } from 'react-router'

const MainRoutes = () => {
    let routes = useRoutes([
        {
            // path: '/',
            // element: <MainLayout />,
            // children: [
                // { index: true, element: <Home /> }
            // ],
        },
    ])
    return routes
}
