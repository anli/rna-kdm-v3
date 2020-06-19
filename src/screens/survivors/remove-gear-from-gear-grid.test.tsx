import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSurvivorSlice} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import SurvivorsScreen from './survivors';

const feature = loadFeature('./e2e/remove-gear-from-gear-grid.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;

  beforeEach(() => {});

  test('remove gear from gear grid', ({given, when, then}) => {
    given('I am any', async () => {});

    given('data of "First Gear" is "Cloth"', async () => {
      store = configureStore({
        reducer: {
          survivor: getSurvivorSlice({
            gears: [
              {name: 'Cloth', imageUrl: 'clothImageUrl'},
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
              undefined,
            ],
          }).reducer,
        },
      });
      component = render(<SurvivorsScreen.Component />, store);
    });

    given('I am at "Survivors Screen"', async () => {
      fireEvent.press(component.getByTestId('GearRemoveButton'));
    });

    given('I press "First Gear"', async () => {
      fireEvent.press(component.getAllByText('Cloth')[0]);
    });

    when('I press "Remove Gear"', async () => {
      fireEvent.press(component.getByTestId('GearRemoveButton'));
    });

    then('I should see "First Item" is "None"', async () => {
      expect(component.getAllByText('None')).toHaveLength(9);
    });
  });
});
