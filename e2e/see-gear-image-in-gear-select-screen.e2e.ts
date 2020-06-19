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
    given('I am any', async () => {});

    given('I am at "Gear Select Screen"', async () => {
      await expect(element(by.id('SurvivorsScreen'))).toBeVisible();
      await element(by.text('None'))
        .atIndex(0)
        .tap();
      await element(by.id('GearAddButton')).tap();
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
