import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./remove-gear-from-gear-grid.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('remove gear from gear grid', ({given, when, then}) => {
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

    given('data of "First Gear" is "Cloth"', async () => {
      await expect(element(by.id('survivor1Screen'))).toBeVisible();
      await element(by.text('None').withAncestor(by.id('survivor1Screen')))
        .atIndex(0)
        .tap();
      await element(
        by.id('GearAddButton').withAncestor(by.id('survivor1Screen')),
      ).tap();
      await expect(element(by.id('GearSelectScreen'))).toBeVisible();
      await element(by.text('Cloth')).tap();
      await element(by.text('CONFIRM')).tap();
    });

    given('I am at "Survivors Screen"', async () => {
      await expect(element(by.id('survivor1Screen'))).toBeVisible();
    });

    given('I press "First Gear"', async () => {
      await element(
        by.text('Cloth').withAncestor(by.id('survivor1Screen')),
      ).tap();
    });

    when('I press "Remove Gear"', async () => {
      await element(
        by.id('GearRemoveButton').withAncestor(by.id('survivor1Screen')),
      ).tap();
    });

    then('I should see "First Item" is "None"', async () => {
      await expect(
        element(by.text('None').withAncestor(by.id('survivor1Screen'))).atIndex(
          0,
        ),
      ).toBeVisible();
    });
  });
});
