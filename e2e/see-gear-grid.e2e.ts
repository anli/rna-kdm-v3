import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-gear-grid.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('No items', ({given, when, then}) => {
    given('I am any', async () => {});

    given('data of "Gear Grid" is "Undefined"', async () => {});

    when('I am at "Survivors Screen"', async () => {
      await expect(element(by.id('SurvivorsScreen'))).toBeVisible();
    });

    then('I should see "Gear Grid"', async () => {
      await expect(element(by.text('Gear Grid'))).toBeVisible();
    });

    then('I should see "None"', async () => {
      await expect(element(by.text('None')).atIndex(0)).toBeVisible();
    });
  });
});
