import getSurvivorSlice from './get-slice';

const initialState = {
  gears: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};
const survivorSlice = getSurvivorSlice(initialState);

export default survivorSlice;
