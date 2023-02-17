import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import Paper from '@mui/material/Paper';
import { BasicModal } from '../components/Modal';
import { Divider } from '@mui/material';
import { fetchJeopardyCategory, gameOver } from '../redux/jeopardySlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CategoryItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#388e3c',
    ...theme.typography.body2,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px',
}));

const Category = styled(Paper)(({ theme }) => ({
    backgroundColor: 'grey',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px',
}));

const Game = () => {
    const {
        category,
        score,
        loading,
        error,
        totalCorrectAnswer,
        totalInCorrectAnswer,
        ids,
    } = useAppSelector((state) => state.jeopardy);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const handleGameOver = () => {
        dispatch(gameOver(new Date()));

        dispatch(fetchJeopardyCategory());
        navigation('/');
    };

    useEffect(() => {
        if (!ids.length) {
            dispatch(fetchJeopardyCategory());
        }
    }, [ids, dispatch]);

    useEffect(() => {
        if (totalCorrectAnswer + totalInCorrectAnswer >= 25) {
            dispatch(gameOver(new Date()));
        }
    }, [totalCorrectAnswer, totalInCorrectAnswer]);

    if (loading)
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography>'Something went wrong'</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                {!!category.length &&
                    category.map((item, index) => (
                        <Grid
                            key={item.id}
                            container
                            spacing={{ xs: 2, md: 3 }}
                        >
                            <Grid item xs={2}>
                                <Category>{item.title}</Category>
                            </Grid>

                            {item.clues.map((subItem, subIndex) => (
                                <Grid key={subItem.id} item xs={2}>
                                    <CategoryItem>
                                        <BasicModal
                                            columnId={index}
                                            rowId={subIndex}
                                            clue={subItem}
                                            value={subItem.value}
                                        />
                                    </CategoryItem>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
            </Grid>
            <Divider sx={{ margin: '20px 0' }} />
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={2}>
                    <Category>Score : {score}</Category>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        onClick={handleGameOver}
                        variant='contained'
                        color='error'
                        fullWidth
                    >
                        Game over
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Game;
