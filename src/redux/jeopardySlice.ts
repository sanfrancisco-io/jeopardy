import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { IClues, IJeopardyCategory, JoepardyState, ICategory } from '../types';
import $api from '../utils/axios';

const initialState: JoepardyState = {
    username: '',
    userHistory: [],
    loading: false,
    error: null,
    category: [],
    ids: [],
    entities: {},
    score: 0,
    totalCorrectAnswer: 0,
    totalInCorrectAnswer: 0,
    startDate: '',
    endDate: '',
};

export const jeopardyAdapter = createEntityAdapter<IJeopardyCategory>();
export const jeopardySelectors = jeopardyAdapter.getSelectors(
    (state: RootState) => state.jeopardy
);

export const fetchJeopardyCategory = createAsyncThunk(
    'jeopardy/fetchJeopardyCategory',
    async () => {
        const response = await $api.get(`/categories?count=5`);

        const categoryResponse = await Promise.all(
            response.data.map((item: IJeopardyCategory) =>
                $api.get(`/category?id=${item.id}`)
            )
        );

        const categoryData = categoryResponse.map((item) => item.data);

        return { data: response.data, category: categoryData };
    }
);

export const jeopardySlice = createSlice({
    name: 'jeopardy',
    initialState,
    reducers: {
        login(state, action) {
            state.username = action.payload.username;
            state.startDate = action.payload.startDate;
        },

        correctAnswer(state, action) {
            const { clue, columnId, rowId } = action.payload;

            state.category[columnId].clues[rowId] = {
                ...state.category[columnId].clues[rowId],
                checkAnswer: true,
            };
            state.totalCorrectAnswer += 1;
            state.score += clue.value;
        },

        inCorrectAnswer(state, action) {
            const { columnId, rowId } = action.payload;

            state.category[columnId].clues[rowId] = {
                ...state.category[columnId].clues[rowId],
                checkAnswer: false,
            };

            state.totalInCorrectAnswer += 1;
        },

        gameOver(state, action) {
            const historyObj = {
                totalQuestionAnswer:
                    state.totalCorrectAnswer + state.totalInCorrectAnswer,
                totalCorrectAnswer: state.totalCorrectAnswer,
                totalInCorrectAnswer: state.totalInCorrectAnswer,
                startDate: state.startDate,
                endDate: action.payload,
                username: state.username,
            };

            state.userHistory.push(historyObj);

            state.totalCorrectAnswer = 0;
            state.totalInCorrectAnswer = 0;
            state.startDate = '';
            state.endDate = '';
            state.username = '';
            state.score = 0;
            state.ids = [];
            state.entities = {};
            state.category = [];
        },
    },

    extraReducers(builder) {
        builder.addCase(fetchJeopardyCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchJeopardyCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(fetchJeopardyCategory.fulfilled, (state, action) => {
            jeopardyAdapter.setAll(state, action.payload.data);

            state.category = action.payload.category.map((item: ICategory) => {
                return {
                    ...item,
                    clues: item.clues
                        .map((clue: IClues) => {
                            if (!clue.value) return { ...clue, value: 200 };

                            return clue;
                        })
                        .slice(0, 5)
                        .sort((a: IClues, b: IClues) => a.value - b.value),
                    clues_count: item.clues.length,
                };
            });

            state.loading = false;
            state.error = null;
        });
    },
});

export const { correctAnswer, inCorrectAnswer, gameOver, login } =
    jeopardySlice.actions;

export const jeopardyReducer = jeopardySlice.reducer;
