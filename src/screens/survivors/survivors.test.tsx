import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {RenderAPI} from 'react-native-testing-library';
import SurvivorsScreen from './survivors';

const feature = loadFeature('./e2e/see-gear-grid.feature');

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {});

  test('No items', ({given, when, then}) => {
    given('I am any', async () => {});

    given('data of "Gear Grid" is "Undefined"', async () => {});

    when('I am at "Survivors Screen"', async () => {
      component = render(<SurvivorsScreen.Component />);
    });

    then('I should see "Gear Grid"', async () => {
      expect(component.getByText('Gear Grid')).toBeDefined();
    });

    then('I should see "None"', async () => {
      expect(component.getAllByText('None')).toHaveLength(9);
    });
  });
});
