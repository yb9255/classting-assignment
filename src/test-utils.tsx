import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function WrapperComponent({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>{children}</Routes>
      </Provider>
    </BrowserRouter>
  );
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) {
  return render(ui, { ...options, wrapper: WrapperComponent });
}

export * from '@testing-library/react';
export { customRender as render };
