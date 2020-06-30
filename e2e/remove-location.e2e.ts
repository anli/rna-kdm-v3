import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/remove-location.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('remove location', ({given, when, then}) => {
    given('I am any', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      element(by.id('SettlementScreen.ScrollView')).scroll(500, 'down');
      await element(by.id('LocationResetButton')).tap();
    });
    given('data of "Locations" is "Blacksmith"', async () => {
      await element(by.id('LocationAddButton')).tap();
      await expect(element(by.id('LocationSelectScreen'))).toBeVisible();
      await element(
        by.text('Blacksmith').withAncestor(by.id('LocationSelectScreen')),
      ).tap();
      await element(by.text('CONFIRM')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });
    given('I am at "Settlement Screen"', async () => {});
    when('I press "Blacksmith"', async () => {
      element(by.id('SettlementScreen.ScrollView')).scroll(100, 'down');
      await element(by.text('Blacksmith')).tap();
    });
    when('I press "Location Remove Button"', async () => {
      await element(by.id('LocationRemoveButton')).tap();
    });
    then('I should see "No Blacksmith"', async () => {
      await expect(element(by.text('Blacksmith'))).toBeNotVisible();
    });
  });
});
