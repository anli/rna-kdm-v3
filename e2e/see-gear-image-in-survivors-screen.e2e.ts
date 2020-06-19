import {by, device, element, expect} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./see-gear-image-in-survivors-screen.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('see gear image in survivors screen', ({given, when, then}) => {
    given('I am any', async () => {});

    given(/^data of "First Gear" is "(.*)"$/, async (item: string) => {
      if (item === 'Cloth') {
        await expect(element(by.id('SurvivorsScreen'))).toBeVisible();
        await element(by.text('None'))
          .atIndex(0)
          .tap();
        await element(by.id('GearAddButton')).tap();
        await expect(element(by.id('GearSelectScreen'))).toBeVisible();
        await element(by.text('Cloth')).tap();
        await element(by.text('CONFIRM')).tap();
        return;
      }

      return;
    });

    given('I am at "Survivors Screen"', async () => {
      await expect(element(by.id('SurvivorsScreen'))).toBeVisible();
    });

    when('I press "First Gear"', async () => {
      await element(by.id('Gear0')).tap();
    });

    then(/^I should see "Preview" is "(.*)"$/, async () => {
      await expect(element(by.id('Preview'))).toBeVisible();
    });
  });
});
