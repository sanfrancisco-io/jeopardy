import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IClues } from '../../types';
import { TextField } from '@mui/material';
import { useAppDispatch } from '../../hooks';
import { correctAnswer, inCorrectAnswer } from '../../redux/jeopardySlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    borderRadius: '5px',
    textAlign: 'center',
};

type Props = {
    clue: IClues;
    value: number;
    columnId: number;
    rowId: number;
};

export default function BasicModal({ columnId, rowId, clue, value }: Props) {
    const [open, setOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState<string>('');
    const [timer, setTimer] = React.useState(60);

    const dispatch = useAppDispatch();

    const handleClose = () => {
        if (timer > 0) {
            dispatch(inCorrectAnswer({ clue, columnId, rowId }));
        }
        setOpen(false);
    };

    const handleOpen = () => setOpen(true);

    const checkAnswer = () => {
        if (answer.toLowerCase() === clue.answer.toLowerCase()) {
            dispatch(correctAnswer({ clue, columnId, rowId }));
        } else {
            dispatch(inCorrectAnswer({ clue, columnId, rowId }));
        }

        setOpen(false);
    };

    React.useEffect(() => {
        if (open) {
            const x = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            if (timer <= 0) {
                dispatch(inCorrectAnswer({ clue, columnId, rowId }));
                clearTimeout(x);
                setOpen(false);
            }

            return () => clearInterval(x);
        }
    }, [open, timer]);

    return (
        <div>
            <Button
                disabled={
                    clue.checkAnswer || clue.checkAnswer === false
                        ? true
                        : false
                }
                sx={
                    clue.checkAnswer === false
                        ? {
                              color: 'white',
                              width: '100%',
                              height: '100%',
                              ':disabled': {
                                  color: 'black',
                              },
                              backgroundColor: '#ff1744',
                          }
                        : clue.checkAnswer
                        ? {
                              color: 'white',
                              width: '100%',
                              height: '100%',
                              ':disabled': {
                                  color: 'black',
                              },
                              backgroundColor: '#BFDB38',
                          }
                        : {
                              color: 'white',
                              width: '100%',
                              height: '100%',
                          }
                }
                onClick={handleOpen}
            >
                {clue.checkAnswer
                    ? 'Correct'
                    : clue.checkAnswer === false
                    ? 'In Correct'
                    : value}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                    >
                        Score: {clue.value}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        question : {clue.question}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
                        <TextField
                            size='small'
                            fullWidth
                            sx={{ margin: '10px 0' }}
                            placeholder='type your answer here'
                            variant='outlined'
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Button
                            onClick={checkAnswer}
                            variant='contained'
                            color='success'
                        >
                            Answer
                        </Button>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography>Answer : {clue.answer}</Typography>
                        <Typography>timer : {timer}</Typography>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
