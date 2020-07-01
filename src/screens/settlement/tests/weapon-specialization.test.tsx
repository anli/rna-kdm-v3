import {mockNavigate} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSettlementSlice, settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import SettlementScreen from '../settlement';

const feature = loadFeature('./e2e/weapon-specialization.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
  });

  test('weapon specialization add', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Weapon Specialization Add Button"', async () => {
      fireEvent.press(component.getByTestId('WeaponSpecializationAddButton'));
    });
    then('I should see "Weapon Specialization Select Screen"', async () => {
      expect(mockNavigate).toBeCalledWith('WeaponSpecializationSelectScreen');
    });
    when('I press "Axe Mastery"', async () => {});
    when('I press "Confirm Button"', async () => {});
    then('I should see "Axe Mastery"', async () => {
      store = configureStore({
        reducer: {
          settlement: getSettlementSlice({
            principles: {
              newLife: undefined,
              death: undefined,
              conviction: undefined,
              society: undefined,
            },
            weaponSpecializations: ['Axe Mastery'],
          }).reducer,
        },
      });
      component = render(<SettlementScreen.Component />, store);

      expect(component.getByText('Axe Mastery')).toBeDefined();
      fireEvent.press(component.getByText('Axe Mastery'));
      fireEvent.press(component.getByTestId('WeaponSpecializationResetButton'));
    });
  });
});
