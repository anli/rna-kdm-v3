import {mockGoBack, mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {survivorSlices} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import GearSelectScreen from './gear-select';

const feature = loadFeature('./e2e/add-gear-to-gear-grid.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockGoBack.mockReset();
    mockUseRoute.mockReset();
    mockDispatch.mockReset();
  });

  test('default', ({given, when, then}) => {
    let store: EnhancedStore<any>;

    given('I am any', async () => {});

    given('data of "First Item" is "None"', async () => {});

    given('I am at "Survivors Screen"', async () => {});

    given('I press "First Gear"', async () => {});

    given('I press "Add Gear"', async () => {});

    given('I am at "Gear Select Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {index: 0, slice: 'survivor1'}});
      store = configureStore({
        reducer: {survivor1: survivorSlices.survivor1.reducer},
      });
      component = render(<GearSelectScreen.Component />, store);
    });

    given('I press "Cloth"', async () => {
      fireEvent.press(component.getByText('Cloth'));
    });

    when(/^I press "(.*)"$/, async button => {
      fireEvent.press(component.getByText(button));
    });

    then('I should see "Survivor Screen"', async () => {
      expect(mockGoBack).toBeCalledTimes(1);
    });

    then(/^I should see "First Item" is "(.*)"$/, async item => {
      if (item === 'None') {
        expect(mockDispatch).toBeCalledTimes(0);
        return;
      }

      expect(mockDispatch).toBeCalledWith({
        payload: {
          index: 0,
          item: {
            id: 'cloth',
            imageUrl: 'https://imgur.com/9jQc0IC.png',
            name: 'Cloth',
            typeId: 'gear',
          },
        },
        type: 'survivor1/setGear',
      });
      expect(mockDispatch).toBeCalledTimes(1);
    });
  });
});
