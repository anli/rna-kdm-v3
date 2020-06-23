import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-gear-image-in-gear-select-screen.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see gear image in gear select screen', ({given, when, then}) => {
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

    then(/^I should see "Preview" is "Cloth"$/, async () => {
      await expect(
        element(by.id('Preview').withAncestor(by.id('GearSelectScreen'))),
      ).toBeVisible();
    });
  });
});
