import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSurvivorSlice, survivorSlice} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import SurvivorsScreen from './survivors';

const feature = loadFeature('./e2e/see-gear-image-in-survivors-screen.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;

  beforeEach(() => {});

  test('see gear image in survivors screen', ({given, when, then}) => {
    given('I am any', async () => {});

    given(/^data of "First Gear" is "(.*)"$/, async (item: string) => {
      if (item === 'Cloth') {
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
        return;
      }

      store = configureStore({
        reducer: {survivor: survivorSlice.reducer},
      });
      return;
    });

    given('I am at "Survivors Screen"', async () => {
      component = render(<SurvivorsScreen.Component />, store);
    });

    when('I press "First Gear"', async () => {
      await fireEvent.press(component.getByTestId('Gear0'));
    });

    then(/^I should see "Preview" is "(.*)"$/, async (result: string) => {
      if (result === 'Cloth') {
        expect(
          component.getByTestId('Preview').props.children.props.uri,
        ).toEqual('clothImageUrl');
        return;
      }

      expect(component.getByTestId('Preview').props.children).toEqual(
        undefined,
      );
      return;
    });
  });
});
