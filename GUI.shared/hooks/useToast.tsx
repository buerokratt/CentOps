import { useContext } from 'react';

import { ToastContext } from '@centopsmodule/shared/context/ToastContext.tsx';

export const useToast = () => useContext(ToastContext);
