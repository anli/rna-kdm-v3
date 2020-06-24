import {mockGoBack, mockUseRoute} from '@mocks';
import {configureStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import PrincipleSelectScreen from './principle-select';

const feature = loadFeature('./e2e/add-principle.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockGoBack.mockReset();
    mockUseRoute.mockReset();
    mockDispatch.mockReset();
  });

  test('add active principle', ({given, when, then}) => {
    given('I am any', async () => {});
    given('I am at "Settlement Screen"', async () => {});
    when('I press "Principle New Life"', async () => {
      mockUseRoute.mockReturnValue({params: {id: 'newLife'}});
    });
    when('I press "Principle Select Button"', async () => {});
    then('I should see "Principle Select Screen"', async () => {
      const store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<PrincipleSelectScreen.Component />, store);
    });
    then('I press "Protect the Young"', async () => {
      fireEvent.press(component.getByText('CONFIRM'));
      fireEvent.press(component.getByText('Protect the Young'));
    });
    then(/^I press "(.*)"$/, async button => {
      fireEvent.press(component.getByText(button));
      expect(mockGoBack).toBeCalledTimes(1);
    });
    then(/^I should see "(.*)"$/, async result => {
      if (result === 'Nothing Selected') {
        return expect(mockDispatch).toBeCalledTimes(0);
      }

      return expect(mockDispatch).toBeCalledWith({
        payload: {
          id: 'newLife',
          item: {
            id: 'protectTheYoung',
            imageUrl: 'https://imgur.com/yFC0RJw.png',
            name: 'Protect the Young',
          },
        },
        type: 'settlement/setPrinciple',
      });
    });
  });
});
