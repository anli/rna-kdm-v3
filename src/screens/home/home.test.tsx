import {render} from '@test';
import React from 'react';
import 'react-native';
import HomeScreen from './home';

describe('Home Screen', () => {
  it('Given any, When I am at "Home Screen", Then I should see "Home"', async () => {
    const component = render(<HomeScreen.Component />);
    expect(component.getByText('Home')).toBeDefined();
  });
});
