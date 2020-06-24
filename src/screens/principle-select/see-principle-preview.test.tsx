import {mockUseRoute} from '@mocks';
import {configureStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import PrincipleSelectScreen from './principle-select';

const feature = loadFeature('./e2e/see-principle-preview.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(async () => {
    mockUseRoute.mockReset();
  });

  test('see active principle preview', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "New life" is "Protect the Young"', async () => {});
    given('I am at "Settlement Screen"', async () => {});
    when('I press "Protect the Young"', async () => {
      mockUseRoute.mockReturnValue({params: {id: 'newLife'}});
    });
    then('I should see "Protect the Young Preview"', async () => {});
    when('I press "Principle Select Button"', async () => {});
    when('I should see "Principle Select Screen"', async () => {
      const store = configureStore({
        reducer: {
          settlement: settlementSlice.reducer,
        },
      });
      component = render(<PrincipleSelectScreen.Component />, store);
    });
    when('I press "Survival of the Fittest"', async () => {
      fireEvent.press(component.getByText('Survival of the Fittest'));
    });
    then('I should see Survival of the Fittest Preview', async () => {
      expect(component.getByTestId('Preview').props.children.props.uri).toEqual(
        'https://imgur.com/3J7hf4Q.png',
      );
      return;
    });
  });
});
