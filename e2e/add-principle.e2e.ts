import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./add-principle.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('add active principle', ({given, when, then}) => {
    given('I am any', async () => {});
    given('I am at "Settlement Screen"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await element(by.id('PrincipleResetButton')).tap();
    });
    when('I press "Principle New Life"', async () => {
      await element(by.text('New Life')).tap();
    });
    when('I press "Principle Select Button"', async () => {
      await element(by.id('PrincipleSetButton')).tap();
    });
    then('I should see "Principle Select Screen"', async () => {
      await expect(element(by.id('PrincipleSelectScreen'))).toBeVisible();
    });
    then('I press "Protect the Young"', async () => {
      await element(
        by
          .text('Protect the Young')
          .withAncestor(by.id('PrincipleSelectScreen')),
      ).tap();
    });
    then(/^I press "(.*)"$/, async button => {
      await element(by.text(button)).tap();
    });
    then(/^I should see "(.*)"$/, async result => {
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      if (result === 'Nothing Selected') {
        return await expect(
          element(
            by
              .text('Protect the Young')
              .withAncestor(by.id('SettlementScreen')),
          ),
        ).toBeNotVisible();
      }

      return await expect(
        element(
          by.text('Protect the Young').withAncestor(by.id('SettlementScreen')),
        ),
      ).toBeVisible();
    });
  });
});
