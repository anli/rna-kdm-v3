import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/add-active-innovation.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('reset active innovation', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "Innovation" is "Language"', async () => {
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
    when('I am at "Settlement Screen"', async () => {
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });
    when('I press "Innovation Reset Button"', async () => {
      await element(by.id('InnovationResetButton')).tap();
    });
    then('I should see "No Innovations"', async () => {
      await expect(element(by.text('Language'))).toBeNotVisible();
    });
  });

  test('add active innovation', ({given, when, then}) => {
    given('I am any', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await element(by.id('InnovationResetButton')).tap();
    });
    when('I am at "Settlement Screen"', async () => {});
    when('I press "Innovation Add Button"', async () => {
      await element(by.id('InnovationAddButton')).tap();
    });
    then('I should see "Innovation Select Screen"', async () => {
      await expect(element(by.id('InnovationSelectScreen'))).toBeVisible();
    });
    when('I press "Language"', async () => {
      await element(
        by.text('Language').withAncestor(by.id('InnovationSelectScreen')),
      ).tap();
    });
    when('I press "Confirm Button"', async () => {
      await element(by.text('CONFIRM')).tap();
    });
    then('I should see "Language"', async () => {
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await expect(element(by.text('Language'))).toBeVisible();
    });
  });
});
