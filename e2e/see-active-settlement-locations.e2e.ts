import {by, device, element, expect, waitFor} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/see-active-settlement-locations.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see active settlement locations', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });
    then('I should see "Locations"', async () => {
      await waitFor(element(by.text('Locations')))
        .toBeVisible()
        .whileElement(by.id('SettlementScreen.ScrollView'))
        .scroll(50, 'down');
      await expect(element(by.text('Locations'))).toBeVisible();
    });
  });
});
