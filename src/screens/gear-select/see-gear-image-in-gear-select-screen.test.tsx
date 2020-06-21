import {mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {survivorSlices} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import GearSelectScreen from './gear-select';

const feature = loadFeature(
  './e2e/see-gear-image-in-gear-select-screen.feature',
);

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;

  beforeEach(() => {
    mockUseRoute.mockReset();
  });

  test('see gear image in gear select screen', ({given, when, then}) => {
    given('I am any', async () => {});

    given('I am at "Gear Select Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {index: 0, slice: 'survivor1'}});
      store = configureStore({
        reducer: {survivor1: survivorSlices.survivor1.reducer},
      });
      component = render(<GearSelectScreen.Component />, store);
    });

    when('I press "Cloth"', async () => {
      await fireEvent.press(component.getByText('Cloth'));
    });

    then(/^I should see "Preview" is "Cloth"$/, async () => {
      expect(component.getByTestId('Preview').props.children.props.uri).toEqual(
        'https://imgur.com/9jQc0IC.png',
      );
    });
  });
});
