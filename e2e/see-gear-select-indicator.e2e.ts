import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-gear-select-indicator.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see gear select indicator at survivors screen', ({
    given,
    when,
    then,
  }) => {
    given('I am any', async () => {
      await element(
        by.id('GearResetButton').withAncestor(by.id('survivor1Screen')),
      ).tap();
      await expect(
        element(by.text('None').withAncestor(by.id('survivor1Screen'))).atIndex(
          0,
        ),
      ).toBeVisible();
    });

    given('I am at "Survivors Screen"', async () => {
      await expect(element(by.id('survivor1Screen'))).toBeVisible();
    });

    when('I press "first item"', async () => {
      await element(
        by.id('Gear0').withAncestor(by.id('survivor1Screen')),
      ).tap();
    });

    then('I should see "first Item Selected Indicator"', async () => {
      await expect(
        element(by.id('Gear0.Selected').withAncestor(by.id('survivor1Screen'))),
      ).toBeVisible();
    });
  });

  test('see gear select indicator at gear select screen', ({
    given,
    when,
    then,
  }) => {
    given('I am any', async () => {});

    given('I am at "Gear Select Screen"', async () => {
      await expect(element(by.id('survivor1Screen'))).toBeVisible();
      await element(by.text('None').withAncestor(by.id('survivor1Screen')))
        .atIndex(0)
        .tap();
      await element(
        by.id('GearAddButton').withAncestor(by.id('survivor1Screen')),
      ).tap();
      await expect(element(by.id('GearSelectScreen'))).toBeVisible();
    });

    when('I press "Cloth"', async () => {
      await element(by.text('Cloth')).tap();
    });

    then('I should see "Cloth Selected Indicator"', async () => {
      await expect(element(by.id('Gear.cloth.Selected'))).toBeVisible();
    });
  });
});
