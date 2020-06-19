import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {survivorEpic, survivorSlice} from '@survivor';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

const epicMiddleware = createEpicMiddleware();
const epics: any[] = [...survivorEpic];

const rootEpic = (action$: any) => combineEpics(...epics)(action$).pipe();

const getStore = () => {
  const store = configureStore({
    reducer: {survivor: survivorSlice.reducer},
    middleware: [...getDefaultMiddleware(), epicMiddleware],
  });

  epicMiddleware.run(rootEpic);
  return store;
};

const store = getStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
