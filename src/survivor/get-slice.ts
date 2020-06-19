import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Gear {
  name: string;
}

export interface SurvivorState {
  gears?: (Gear | undefined)[];
}

const getSurvivorSlice = (initialState: SurvivorState) =>
  createSlice({
    name: 'Survivor',
    initialState,
    reducers: {
      setGear: (
        state: SurvivorState,
        action: PayloadAction<{index: number; item: Gear | undefined}>,
      ) => {
        state.gears?.splice(action.payload.index, 1, action.payload.item);
      },
    },
  });

export default getSurvivorSlice;
