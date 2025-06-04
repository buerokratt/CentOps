import { useContext } from 'react';

import { ToastContext } from 'context/ToastContext.tsx';

export const useToast = () => useContext(ToastContext);
