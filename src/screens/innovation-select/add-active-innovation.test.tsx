import {mockNavigate, mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import InnovationSelectScreen from './innovation-select';

const feature = loadFeature('./e2e/add-active-innovation.feature');

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

  test('reset active innovation', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "Innovation" is "Language"', async () => {});
    when('I am at "Settlement Screen"', async () => {});
    when('I press "Innovation Reset Button"', async () => {});
    then('I should see "No Innovations"', async () => {});
  });

  test('add active innovation', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {});
    when('I press "Innovation Add Button"', async () => {});
    then('I should see "Innovation Select Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {innovations: []}});
      store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<InnovationSelectScreen.Component />, store);
    });
    when('I press "Language"', async () => {
      fireEvent.press(component.getByText('CONFIRM'));
      fireEvent.press(component.getByText('Language'));
    });
    when('I press "Confirm Button"', async () => {
      fireEvent.press(component.getByText('CONFIRM'));
    });
    then('I should see "Language"', async () => {
      expect(mockDispatch).toBeCalledWith({
        payload: ['language'],
        type: 'settlement/innovationSet',
      });
    });
  });
});
