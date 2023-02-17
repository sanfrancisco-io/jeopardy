import { Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchJeopardyCategory, gameOver } from '../../redux/jeopardySlice';

type Props = {};

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

const GameActions = (props: Props) => {
    const {
        score,

        username,
    } = useAppSelector((state) => state.jeopardy);
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const handleGameOver = () => {
        dispatch(gameOver(new Date()));

        dispatch(fetchJeopardyCategory());
        navigation('/');
    };

    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={2}>
                <Category>Score : {score}</Category>
            </Grid>
            <Grid item xs={2}>
                <Category>Your name : {username}</Category>
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
    );
};

export default GameActions;
