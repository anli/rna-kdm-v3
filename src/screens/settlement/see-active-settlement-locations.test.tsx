import {configureStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {RenderAPI} from 'react-native-testing-library';
import SettlementScreen from './settlement';

const feature = loadFeature('./e2e/see-active-settlement-locations.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {});

  test('see active settlement locations', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      const store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<SettlementScreen.Component />, store);
    });
    then('I should see "Locations"', async () => {
      expect(component.getByText('Locations')).toBeDefined();
    });
  });
});
