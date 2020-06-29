import {by, device, element, expect, waitFor} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/draw-settlement-event.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('draw settlement event', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });
    when('I press "Draw Settlement Event Button"', async () => {
      await waitFor(element(by.id('SettlementEventDrawButton')))
        .toBeVisible()
        .whileElement(by.id('SettlementScreen.ScrollView'))
        .scroll(50, 'down');
      await element(by.id('SettlementEventDrawButton')).tap();
    });
    then('I should see "Settlement Event"', async () => {
      await expect(element(by.id('SettlementEvent'))).toBeVisible();
    });
  });
});
