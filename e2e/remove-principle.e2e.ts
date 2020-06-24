import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('e2e/remove-principle.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('remove active principle', ({given, when, then}) => {
    given('I am any', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await element(by.id('PrincipleResetButton')).tap();
    });
    given('data of "New Life" is "Protect the Young"', async () => {
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
    given('I am at "Settlement Screen"', async () => {});
    when('I press "New Life"', async () => {
      await element(by.text('New Life')).tap();
    });
    when('I press "Remove Principle Button"', async () => {
      await element(by.id('PrincipleRemoveButton')).tap();
    });
    then('I should not see "Protect the Young"', async () => {
      await expect(element(by.text('Protect the Young'))).toBeNotVisible();
    });
  });
});
