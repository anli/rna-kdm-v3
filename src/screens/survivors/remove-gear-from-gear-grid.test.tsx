import {mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSurvivorSlice, survivorSlices} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {act, fireEvent, RenderAPI} from 'react-native-testing-library';
import SurvivorsScreen from './survivors';

const feature = loadFeature('./e2e/remove-gear-from-gear-grid.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;

  beforeEach(() => {
    mockUseRoute.mockReset();
  });

  test('remove gear from gear grid', ({given, when, then}) => {
    given('I am any', async () => {});

    given('data of "First Gear" is "Cloth"', async () => {
      mockUseRoute.mockReturnValue({params: {slice: 'survivor1'}});
      store = configureStore({
        reducer: {
          survivor1: getSurvivorSlice(
            {
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
            },
            'survivor1',
          ).reducer,
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
      act(() => {
        store.dispatch(
          survivorSlices.survivor1.actions.loadSuccess({
            gears: [null, null, null, null, null, null, null, null, null],
          }),
        );
      });
    });

    then('I should see "First Item" is "None"', async () => {
      expect(component.getAllByText('None')).toHaveLength(9);
    });
  });
});
