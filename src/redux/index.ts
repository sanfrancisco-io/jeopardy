import { configureStore } from '@reduxjs/toolkit';
import { jeopardyReducer } from './jeopardySlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'jeopardy',
    storage,
};

const persistedReducer = persistReducer(persistConfig, jeopardyReducer);

export const store = configureStore({
    reducer: {
        jeopardy: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'pause/PAUSE',
                    '/purge/PURGE',
                    '/register/REGISTER',
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
