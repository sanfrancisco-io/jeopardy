import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MainNavigation } from '../components/MainNavigation';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchJeopardyCategory } from '../redux/jeopardySlice';
import Login from './Login';

function RootLayout() {
    const { username } = useAppSelector((state) => state.jeopardy);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(fetchJeopardyCategory());
    // }, [dispatch]);

    return (
        <>
            <MainNavigation />
            <main>{username.length ? <Outlet /> : <Login />}</main>
        </>
    );
}

export default RootLayout;
