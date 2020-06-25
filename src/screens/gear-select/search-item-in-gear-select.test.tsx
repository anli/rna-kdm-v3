import {mockUseRoute} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {survivorSlices} from '@survivor';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI, waitFor} from 'react-native-testing-library';
import GearSelectScreen from './gear-select';

const feature = loadFeature('./e2e/search-item-in-gear-select.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;

  beforeEach(async () => {
    mockUseRoute.mockReset();
  });

  test('search item in gear select', ({given, when, then}) => {
    given('I am any', async () => {});
    given('I am at "Gear Select Screen"', async () => {
      mockUseRoute.mockReturnValue({params: {index: 0, slice: 'survivor1'}});
      store = configureStore({
        reducer: {survivor1: survivorSlices.survivor1.reducer},
      });
      component = render(<GearSelectScreen.Component />, store);
    });
    when('I search "Bone Blade"', async () => {
      fireEvent(
        component.getByTestId('SearchField'),
        'onChangeText',
        'Bone Blade',
      );
    });
    then('I should see "Bone Blade"', async () => {
      await waitFor(() => component.getByText('Bone Blade'));
      expect(component.getByText('Bone Blade')).toBeDefined();
    });
  });
});
