import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface PrincipleValue {
  id: string;
  name: string;
  imageUrl: string;
}

export type PrincipleId = 'newLife' | 'death' | 'conviction' | 'society';

export interface SettlementState {
  principles?: {[key in PrincipleId]?: PrincipleValue};
  innovations?: string[];
}

/* istanbul ignore next */
const getSettlementSlice = (initialState: SettlementState) =>
  createSlice({
    name: 'settlement',
    initialState,
    reducers: {
      setPrinciple: (
        _: SettlementState,
        __: PayloadAction<{id: string; item?: PrincipleValue}>,
      ) => {},
      setPrincipleSuccess: () => {},
      load: () => {},
      loadSuccess: (_: SettlementState, action: PayloadAction<any>) => {
        if (action.payload) {
          return action.payload;
        }
      },
      principleReset: () => {},
      principleResetSuccess: () => {},
      innovationReset: () => {},
      innovationResetSuccess: () => {},
      innovationSet: (_: SettlementState, __: PayloadAction<string[]>) => {},
      innovationSetSuccess: () => {},
    },
  });

export default getSettlementSlice;
