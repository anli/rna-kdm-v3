import {mockUseRoute} from '@mocks';
import {configureStore} from '@reduxjs/toolkit';
import {survivorSlice} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import GearSelectScreen from './gear-select';

const feature = loadFeature('./e2e/see-gear-select-indicator.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {
    mockUseRoute.mockReset();
  });

  test('see gear select indicator at survivors screen', ({
    given,
    when,
    then,
  }) => {
    given('I am any', async () => {});

    given('I am at "Survivors Screen"', async () => {});

    when('I press "first item"', async () => {});

    then('I should see "first Item Selected Indicator"', async () => {});
  });

  test('see gear select indicator at gear select screen', ({
    given,
    when,
    then,
  }) => {
    given('I am any', async () => {});

    given('I am at "Gear Select Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {index: 0}});
      const store = configureStore({
        reducer: {survivor: survivorSlice.reducer},
      });
      component = render(<GearSelectScreen.Component />, store);
    });

    when('I press "Cloth"', async () => {
      await fireEvent.press(component.getByTestId('Gear.cloth'));
    });

    then('I should see "Cloth Selected Indicator"', async () => {
      expect(component.getByTestId('Gear.cloth.Selected')).toBeDefined();
    });
  });
});
