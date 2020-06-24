import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-principle-preview.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see active principle preview', ({given, when, then}) => {
    given('I am any', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await element(by.id('PrincipleResetButton')).tap();
    });
    given('data of "New life" is "Protect the Young"', async () => {
      await element(by.text('New Life')).tap();
      await element(by.id('PrincipleSetButton')).tap();
      await expect(element(by.id('PrincipleSelectScreen'))).toBeVisible();
      await element(
        by
          .text('Protect the Young')
          .withAncestor(by.id('PrincipleSelectScreen')),
      ).tap();
      await element(by.text('CONFIRM')).tap();
    });
    given('I am at "Settlement Screen"', async () => {
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
    });
    when('I press "Protect the Young"', async () => {
      await element(by.text('Protect the Young')).tap();
    });
    then('I should see "Protect the Young Preview"', async () => {
      await expect(
        element(by.id('Preview').withAncestor(by.id('SettlementScreen'))),
      ).toBeVisible();
    });
    when('I press "Principle Select Button"', async () => {
      await element(by.id('PrincipleSetButton')).tap();
    });
    when('I should see "Principle Select Screen"', async () => {
      await expect(element(by.id('PrincipleSelectScreen'))).toBeVisible();
    });
    when('I press "Survival of the Fittest"', async () => {
      await element(by.text('Survival of the Fittest')).tap();
    });

    then('I should see Survival of the Fittest Preview', async () => {
      await expect(
        element(by.id('Preview').withAncestor(by.id('PrincipleSelectScreen'))),
      ).toBeVisible();
    });
  });
});
