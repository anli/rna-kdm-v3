import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-4-departing-survivor-gear-grid.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see 4 departing survivor gear grid', ({given, when, then}) => {
    given('I am any', async () => {});

    given('I am at "Survivors Screen"', async () => {
      await expect(element(by.id('survivor1Screen'))).toBeVisible();
    });

    when(/^I press "(.*)"$/, async (button: string) => {
      await element(by.id(`${button}TopTab`)).tap();
    });

    then(/^I should see "(.*) Gear Grid"$/, async (button: string) => {
      await expect(element(by.id(`${button}Screen`))).toBeVisible();
    });
  });
});
