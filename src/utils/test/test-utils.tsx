import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import questionsSliceReducer from '../../redux/questions/reducer';
import { configureStore } from '@reduxjs/toolkit';
import watch from '../../redux/sagas';
import { InitialState } from '../../redux/questions/types';

type WrapperComponentProps = {
  preloadedState?: {
    questions: Partial<InitialState>;
  };
  children: React.ReactNode;
};

function WrapperComponent({ children, preloadedState }: WrapperComponentProps) {
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
        startTime: 0,
        endTime: 0,
        ...preloadedState?.questions,
      },
    },
  });

  sagaMiddleware.run(watch);

  return <Provider store={store}>{children}</Provider>;
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & {
    preloadedState?: { questions: Partial<InitialState> };
  }
) {
  return render(ui, {
    wrapper: (props) => (
      <WrapperComponent {...props} preloadedState={options?.preloadedState} />
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { customRender as render };
