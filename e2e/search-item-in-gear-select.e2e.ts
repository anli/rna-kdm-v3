import {by, device, element, expect, waitFor} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/search-item-in-gear-select.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('search item in gear select', ({given, when, then}) => {
    given('I am any', async () => {});
    given('I am at "Gear Select Screen"', async () => {
      await element(by.id('SurvivorsBottomTab')).tap();
      await element(
        by.id('GearResetButton').withAncestor(by.id('survivor1Screen')),
      ).tap();
      await expect(
        element(by.text('None').withAncestor(by.id('survivor1Screen'))).atIndex(
          0,
        ),
      ).toBeVisible();
      await element(by.text('None').withAncestor(by.id('survivor1Screen')))
        .atIndex(0)
        .tap();
      await element(
        by.id('GearAddButton').withAncestor(by.id('survivor1Screen')),
      ).tap();
      await expect(element(by.id('GearSelectScreen'))).toBeVisible();
    });
    when('I search "Bone Blade"', async () => {
      await element(by.id('SearchField')).typeText('Bone Blade');
    });
    then('I should see "Bone Blade"', async () => {
      await waitFor(
        element(
          by.id('Gear.boneBlade').withAncestor(by.id('GearSelectScreen')),
        ),
      )
        .toBeVisible()
        .withTimeout(5000);
    });
  });
});
