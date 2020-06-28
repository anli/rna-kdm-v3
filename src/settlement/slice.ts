import getSettlementSlice from './get-slice';

const initialState = {
  principles: {
    newLife: undefined,
    death: undefined,
    conviction: undefined,
    society: undefined,
  },
  innovations: [],
};
const settlementSlice = getSettlementSlice(initialState);

export default settlementSlice;
