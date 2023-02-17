import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Divider } from '@mui/material';
import { fetchJeopardyCategory, gameOver } from '../redux/jeopardySlice';
import { useEffect } from 'react';
import { Categories } from '../components/Game';
import { Navigate } from 'react-router-dom';
import GameActions from '../components/Game/GameActions';

const Game = () => {
    const {
        category,
        loading,
        error,
        totalCorrectAnswer,
        totalInCorrectAnswer,
        ids,
        username,
    } = useAppSelector((state) => state.jeopardy);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!ids.length) {
            dispatch(fetchJeopardyCategory());
        }
    }, [ids, dispatch]);

    useEffect(() => {
        if (totalCorrectAnswer + totalInCorrectAnswer >= 25) {
            dispatch(gameOver(new Date()));
        }
    }, [totalCorrectAnswer, totalInCorrectAnswer, dispatch]);

    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>Something went wrong</Typography>
            </Box>
        );
    }

    if (!username) {
        return <Navigate to='/' replace />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                {!!category.length &&
                    category.map((item, index) => (
                        <Categories category={item} index={index} />
                    ))}
            </Grid>
            <Divider sx={{ margin: '20px 0' }} />
            <GameActions />
        </Box>
    );
};

export default Game;
