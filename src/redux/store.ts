import { configureStore } from '@reduxjs/toolkit';
import questionsSliceReducer from './questions/reducer';
import createSagaMiddleware from 'redux-saga';
import watch from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    questions: questionsSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watch);

export type RootState = ReturnType<typeof store.getState>;
export default store;
