import {mockNavigate} from '@mocks';
import {configureStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import SettlementScreen from '../settlement';

const feature = loadFeature('./e2e/add-principle.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {
    mockNavigate.mockReset();
  });

  test('add active principle', ({given, when, then}) => {
    given('I am any', async () => {});
    given('I am at "Settlement Screen"', async () => {
      const store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Principle New Life"', async () => {
      fireEvent.press(component.getByTestId('PrincipleResetButton'));
      fireEvent.press(component.getByTestId('PrincipleSetButton'));
      fireEvent.press(component.getByTestId('Principle.newLife'));
    });
    when('I press "Principle Select Button"', async () => {
      fireEvent.press(component.getByTestId('PrincipleSetButton'));
    });
    then('I should see "Principle Select Screen"', async () => {
      expect(mockNavigate).toBeCalledWith('PrincipleSelectScreen', {
        id: 'newLife',
      });
    });
    then('I press "Protect the Young"', async () => {});
    then(/^I press "(.*)"$/, async () => {});
    then(/^I should see "(.*)"$/, async () => {});
  });
});
