import {configureStore} from '@reduxjs/toolkit';
import {getSettlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import SettlementScreen from './settlement';

const feature = loadFeature('./e2e/see-principle-preview.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(async () => {});

  test('see active principle preview', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "New life" is "Protect the Young"', async () => {});
    given('I am at "Settlement Screen"', async () => {
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
    when('I press "Protect the Young"', async () => {
      fireEvent.press(component.getByTestId('Principle.newLife'));
    });
    then('I should see "Protect the Young Preview"', async () => {
      expect(component.getByTestId('Preview').props.children.props.uri).toEqual(
        'https://imgur.com/yFC0RJw.png',
      );
      return;
    });
    when('I press "Principle Select Button"', async () => {});
    when('I should see "Principle Select Screen"', async () => {});
    when('I press "Survival of the Fittest"', async () => {});
    then('I should see Survival of the Fittest Preview', async () => {});
  });
});
