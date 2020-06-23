import {mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSurvivorSlice} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import SurvivorsScreen from './survivors';

const feature = loadFeature('./e2e/reset-items-in-gear-grid.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockUseRoute.mockReset();
    mockDispatch.mockReset();
  });

  test('reset items in gear grid', ({given, when, then}) => {
    given('I am any', async () => {});

    given('data of "First Item" is "Cloth"', async () => {
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
    });

    given('I am at "Survivors Screen"', async () => {
      component = render(<SurvivorsScreen.Component />, store);
    });

    when('I press "Gear Reset Button"', async () => {
      fireEvent.press(component.getByTestId('GearResetButton'));
    });

    then('I should see "First Item" is "None"', async () => {
      expect(mockDispatch).toHaveBeenLastCalledWith({
        payload: undefined,
        type: 'survivor1/gearReset',
      });
    });
  });
});
