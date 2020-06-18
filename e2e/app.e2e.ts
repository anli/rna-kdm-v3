import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./app.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('Default', ({given, when, then}) => {
    given('I am any', async () => {});

    when('I am at "Home Screen"', async () => {});

    then('I should see "Home"', async () => {
      await expect(element(by.text('Home'))).toBeVisible();
    });
  });
});
