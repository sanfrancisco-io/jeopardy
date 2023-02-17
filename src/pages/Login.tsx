import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../redux/jeopardySlice';

type Props = {};

const Login = (props: Props) => {
    const [user, setUser] = useState('');
    const navigation = useNavigate();
    const dispatch = useAppDispatch();
    const username = useAppSelector((state) => state.jeopardy.username);

    useEffect(() => {
        if (username.length) {
            navigation('/game');
        }
    }, []);

    const setUserName = () => {
        if (!user.length) {
            alert('Please set your name');
            return;
        }

        dispatch(
            login({
                username: user,
                startDate: new Date(),
            })
        );
        navigation('/game');
    };

    return (
        <Box display={'flex'} justifyContent={'center'} gap={4}>
            <TextField
                placeholder='type your name here'
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />

            <Button onClick={setUserName} variant='contained' color='success'>
                Accept
            </Button>
        </Box>
    );
};

export default Login;
