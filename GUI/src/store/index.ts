import {
  createStore as vanillaCreateStore,
  type StateCreator,
} from 'zustand/vanilla';
import { immer } from 'zustand/middleware/immer';

export function createStore<T>(
  initializer: StateCreator<T, [['zustand/immer', never]]>
) {
  const store = vanillaCreateStore<T, [['zustand/immer', never]]>(
    immer(initializer)
  );

  // Add selector functionality
  const storeFunction = <U>(selector: (state: T) => U) => {
    return selector(store.getState());
  };

  // Merge the store methods with the selector function
  return Object.assign(storeFunction, store);
}
