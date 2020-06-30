import {by, device, element, expect, waitFor} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/add-location.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('add location', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      element(by.id('SettlementScreen.ScrollView')).scroll(500, 'down');
      await element(by.id('LocationResetButton')).tap();
    });
    when('I press "Location Add Button"', async () => {
      await element(by.id('LocationAddButton')).tap();
    });
    when('I should see "Location Select Screen"', async () => {
      await expect(element(by.id('LocationSelectScreen'))).toBeVisible();
    });
    when('I press "Lantern Hoard"', async () => {
      element(by.id('Locations')).scroll(200, 'down');
      await element(by.text('Lantern Hoard')).tap();
    });
    when('I press "Confirm Button"', async () => {
      await element(by.text('CONFIRM')).tap();
    });
    then('I should see "Lantern Hoard"', async () => {
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await waitFor(element(by.text('Lantern Hoard')))
        .toBeVisible()
        .whileElement(by.id('SettlementScreen.ScrollView'))
        .scroll(50, 'down');
      await expect(element(by.text('Lantern Hoard'))).toBeVisible();
    });
  });
});
