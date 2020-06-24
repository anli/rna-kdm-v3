import getSettlementSlice from './get-slice';

const initialState = {
  principles: {
    newLife: undefined,
    death: undefined,
    conviction: undefined,
    society: undefined,
  },
};
const settlementSlice = getSettlementSlice(initialState);

export default settlementSlice;
