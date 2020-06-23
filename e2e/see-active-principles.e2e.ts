import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-active-principles.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see active principles', ({given, when, then}) => {
    given('I am any', async () => {});

    when('I am at "Settlement Screen"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });

    then('I should see "Principles"', async () => {
      await expect(element(by.text('Principles'))).toBeVisible();
      await expect(element(by.text('New Life'))).toBeVisible();
      await expect(element(by.text('Death'))).toBeVisible();
      await expect(element(by.text('Conviction'))).toBeVisible();
      await expect(element(by.text('Society'))).toBeVisible();
    });
  });
});
