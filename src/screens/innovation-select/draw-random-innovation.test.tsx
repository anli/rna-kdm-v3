import {mockNavigate, mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import InnovationSelectScreen from './innovation-select';

const feature = loadFeature('./e2e/draw-random-innovation.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
    mockUseRoute.mockReset();
  });

  test('Draw 2 random innovation for selection', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "Active Innovations" is "Language"', async () => {});
    when('I am at "Settlement Screen"', async () => {});
    when('I press "Draw Random Innovation Button"', async () => {
      mockUseRoute.mockReturnValue({
        params: {innovations: ['language'], isDraw: true},
      });
    });
    then('I should see "Innovation Select Screen"', async () => {
      store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<InnovationSelectScreen.Component />, store);

      expect(component.getByTestId('Innovations').props.data).toHaveLength(2);
    });
  });
});
