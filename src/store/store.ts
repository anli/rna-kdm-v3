import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {survivorEpic, survivorSlices} from '@survivor';
import {combineEpics, createEpicMiddleware} from 'redux-observable';

const epicMiddleware = createEpicMiddleware();
const epics: any[] = [...survivorEpic];

// const rootEpic = (action$: any) => combineEpics(...epics)(action$).pipe();

const getStore = () => {
  const store = configureStore({
    reducer: {
      survivor1: survivorSlices.survivor1.reducer,
      survivor2: survivorSlices.survivor2.reducer,
      survivor3: survivorSlices.survivor3.reducer,
      survivor4: survivorSlices.survivor4.reducer,
    },
    middleware: [...getDefaultMiddleware(), epicMiddleware],
  });

  epicMiddleware.run(combineEpics(...epics));
  return store;
};

const store = getStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
