import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import questionsSliceReducer from './redux/questions/reducer';
import { configureStore } from '@reduxjs/toolkit';
import watch from './redux/sagas';

function WrapperComponent({ children }: { children: React.ReactNode }) {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: { questions: questionsSliceReducer },
    middleware: (getDefaultMiddleware) => [
      sagaMiddleware,
      ...getDefaultMiddleware(),
    ],
    preloadedState: {
      questions: {
        isLoading: false,
        questions: [],
        correctAnsweredQuestions: [],
        wrongAnsweredQuestions: [],
        error: null,
      },
    },
  });

  sagaMiddleware.run(watch);

  return <Provider store={store}>{children}</Provider>;
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  return render(ui, { ...options, wrapper: WrapperComponent });
}

export * from '@testing-library/react';
export { customRender as render };
