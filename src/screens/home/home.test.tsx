import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {RenderAPI} from 'react-native-testing-library';
import HomeScreen from './home';

const feature = loadFeature('./home.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  let component: RenderAPI;

  beforeEach(() => {});

  test('Default', ({given, when, then}) => {
    given('I am any', async () => {});

    when('I am at "Home Screen"', async () => {
      component = render(<HomeScreen.Component />);
    });

    then('I should see "Home"', async () => {
      expect(component.getByText('Home')).toBeDefined();
    });
  });
});
