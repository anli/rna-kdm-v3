import {configureStore} from '@reduxjs/toolkit';
import {getSettlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import SettlementScreen from './settlement';

const feature = loadFeature('e2e/remove-principle.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  const mockDispatch = jest.fn();

  beforeEach(async () => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
  });

  test('remove active principle', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "New Life" is "Protect the Young"', async () => {
      const store = configureStore({
        reducer: {
          settlement: getSettlementSlice({
            principles: {
              newLife: {
                id: 'protectTheYoung',
                imageUrl: 'https://imgur.com/yFC0RJw.png',
                name: 'Protect the Young',
              },
              death: undefined,
              conviction: undefined,
              society: undefined,
            },
          }).reducer,
        },
      });
      component = render(<SettlementScreen.Component />, store);
    });
    given('I am at "Settlement Screen"', async () => {});
    when('I press "New Life"', async () => {
      fireEvent.press(component.getByTestId('PrincipleRemoveButton'));
      fireEvent.press(component.getByTestId('Principle.newLife'));
    });
    when('I press "Remove Principle Button"', async () => {
      fireEvent.press(component.getByTestId('PrincipleRemoveButton'));
    });
    then('I should not see "Protect the Young"', async () => {
      expect(mockDispatch).toBeCalledWith({
        payload: {
          id: 'newLife',
          item: undefined,
        },
        type: 'settlement/setPrinciple',
      });
    });
  });
});
