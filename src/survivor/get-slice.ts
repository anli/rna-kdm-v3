import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Gear {
  name: string;
  imageUrl: string;
}

export interface SurvivorState {
  gears?: (Gear | undefined)[];
}

/* istanbul ignore next */
const getSurvivorSlice = (initialState: SurvivorState, name: string) =>
  createSlice({
    name,
    initialState,
    reducers: {
      setGear: (_: SurvivorState, __: PayloadAction<any>) => {},
      setGearSuccess: () => {},
      load: () => {},
      loadSuccess: (_: SurvivorState, action: PayloadAction<any>) => {
        if (action.payload) {
          return action.payload;
        }
      },
      gearReset: () => {},
      gearResetSuccess: () => {},
    },
  });

export default getSurvivorSlice;
