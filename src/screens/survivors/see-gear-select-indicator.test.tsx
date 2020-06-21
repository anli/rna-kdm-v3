import {mockUseRoute} from '@mocks';
import {configureStore} from '@reduxjs/toolkit';
import {survivorSlices} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import SurvivorsScreen from './survivors';

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

    given('I am at "Survivors Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {slice: 'survivor1'}});
      const store = configureStore({
        reducer: {survivor1: survivorSlices.survivor1.reducer},
      });
      component = render(<SurvivorsScreen.Component />, store);
    });

    when('I press "first item"', async () => {
      await fireEvent.press(component.getByTestId('Gear0'));
    });

    then('I should see "first Item Selected Indicator"', async () => {
      expect(component.getByTestId('Gear0.Selected')).toBeDefined();
    });
  });

  test('see gear select indicator at gear select screen', ({
    given,
    when,
    then,
  }) => {
    given('I am any', async () => {});

    given('I am at "Gear Select Screen"', async () => {});

    when('I press "Cloth"', async () => {});

    then('I should see "Cloth Selected Indicator"', async () => {});
  });
});
