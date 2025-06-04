import type { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RootComponent from 'RootComponent';
import { ToastProvider } from 'context/ToastContext';

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
