import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/draw-random-innovation.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('Draw 2 random innovation for selection', ({given, when, then}) => {
    given('I am any', async () => {
      await element(by.id('InnovationResetButton')).tap();
    });
    given('data of "Active Innovations" is "Language"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await element(by.id('InnovationAddButton')).tap();
      await expect(element(by.id('InnovationSelectScreen'))).toBeVisible();
      await element(
        by.text('Language').withAncestor(by.id('InnovationSelectScreen')),
      ).tap();
      await element(by.text('CONFIRM')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });
    when('I am at "Settlement Screen"', async () => {});
    when('I press "Draw Random Innovation Button"', async () => {
      await element(by.id('InnovationDrawButton')).tap();
    });
    then('I should see "Innovation Select Screen"', async () => {
      await expect(element(by.id('InnovationSelectScreen'))).toBeVisible();
    });
  });
});
