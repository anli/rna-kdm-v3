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
const survivorSlices = {
  survivor1: getSurvivorSlice(initialState, 'survivor1'),
  survivor2: getSurvivorSlice(initialState, 'survivor2'),
  survivor3: getSurvivorSlice(initialState, 'survivor3'),
  survivor4: getSurvivorSlice(initialState, 'survivor4'),
};

export default survivorSlices;
