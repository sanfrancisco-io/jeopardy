import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import RootLayout from './pages/RootLayout';
import Statistics from './pages/Statistics';

type Props = {};

const App = (props: Props) => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: '/game',
                    element: <Game />,
                },
                {
                    path: '/statistics',
                    element: <Statistics />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
