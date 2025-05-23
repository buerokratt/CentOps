import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@centopsmodule/shared/context/ToastContext';
import RootComponent from 'RootComponent';

const App: FC = () => {
  return (
    <BrowserRouter basename={'/'}>
      <ToastProvider>
        <RootComponent />
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
