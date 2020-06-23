import {mockNavigate, mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {survivorSlices} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {act, fireEvent, RenderAPI} from 'react-native-testing-library';
import SurvivorsScreen from './survivors';

const feature = loadFeature('./e2e/add-gear-to-gear-grid.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {
    mockNavigate.mockReset();
    mockUseRoute.mockReset();
  });

  test('default', ({given, when, then}) => {
    let store: EnhancedStore<any>;

    given('I am any', async () => {});

    given('data of "First Item" is "None"', async () => {});

    given('I am at "Survivors Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {slice: 'survivor1'}});
      store = configureStore({
        reducer: {survivor1: survivorSlices.survivor1.reducer},
      });
      component = render(<SurvivorsScreen.Component />, store);

      fireEvent.press(component.getByTestId('GearAddButton'));
    });

    given('I press "First Gear"', async () => {
      fireEvent.press(component.getAllByText('None')[0]);
    });

    given('I press "Add Gear"', async () => {
      fireEvent.press(component.getByTestId('GearAddButton'));
    });

    given('I am at "Gear Select Screen"', async () => {
      expect(mockNavigate).toBeCalledWith('GearSelectScreen', {
        index: 0,
        slice: 'survivor1',
      });
    });

    given('I press "Cloth"', async () => {});

    when(/^I press "(.*)"$/, async button => {
      if (button === 'CONFIRM') {
        act(() => {
          store.dispatch(
            survivorSlices.survivor1.actions.loadSuccess({
              gears: [
                {name: 'Cloth', imageUrl: 'clothImageUrl'},
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
              ],
            }),
          );
        });
        return;
      }
    });

    then('I should see "Survivor Screen"', async () => {});

    then(/^I should see "First Item" is "(.*)"$/, async item => {
      if (item === 'None') {
        expect(component.getAllByText(item)).toHaveLength(9);
        return;
      }

      expect(component.getAllByText(item)).toHaveLength(1);
      expect(component.getAllByText('None')).toHaveLength(8);
    });
  });
});
