import {configureStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import SettlementScreen from './settlement';

const feature = loadFeature('./e2e/see-active-principles.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {});

  test('see active principles', ({given, when, then}) => {
    given('I am any', async () => {});

    when('I am at "Settlement Screen"', async () => {
      const store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<SettlementScreen.Component />, store);
    });

    then('I should see "Principles"', async () => {
      expect(component.getByText('Principles')).toBeDefined();
      expect(component.getByText('New Life')).toBeDefined();
      expect(component.getByText('Death')).toBeDefined();
      expect(component.getByText('Conviction')).toBeDefined();
      expect(component.getByText('Society')).toBeDefined();

      fireEvent.press(component.getByTestId('Principle.newLife'));
      fireEvent.press(component.getByTestId('Principle.death'));
      fireEvent.press(component.getByTestId('Principle.conviction'));
      fireEvent.press(component.getByTestId('Principle.society'));
    });
  });
});
