import { Box, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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

const Statistics = (props: Props) => {
    const { userHistory } = useAppSelector((state) => state.jeopardy);

    const monthConfig = [
        'Jan',
        'Feb',
        'March',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    const formateDate = (date: Date) => {
        return `${date.getDate()}:${
            monthConfig[date.getMonth()]
        }:${date.getFullYear()}:${date.getHours()}:${date.getMinutes()}`;
    };

    return (
        <Box>
            <Grid>
                {userHistory.length ? (
                    userHistory.map((item, index) => (
                        <Grid key={index} container spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={2}>
                                <Category>User Name: {item.username}</Category>
                            </Grid>
                            <Grid item xs={2}>
                                <Category>
                                    Start Date:{' '}
                                    {formateDate(new Date(item.startDate))}
                                </Category>
                            </Grid>
                            <Grid item xs={2}>
                                <Category>
                                    End Date:{' '}
                                    {formateDate(new Date(item.endDate))}
                                </Category>
                            </Grid>
                            <Grid item xs={2}>
                                <Category>
                                    Total Questions: {item.totalQuestionAnswer}
                                </Category>
                            </Grid>
                            <Grid item xs={2}>
                                <Category>
                                    Correct Questions: {item.totalCorrectAnswer}
                                </Category>
                            </Grid>
                            <Grid item xs={2}>
                                <Category>
                                    Incorrect Questions:{' '}
                                    {item.totalInCorrectAnswer}
                                </Category>
                            </Grid>
                        </Grid>
                    ))
                ) : (
                    <Grid
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Typography>No one game</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Statistics;
