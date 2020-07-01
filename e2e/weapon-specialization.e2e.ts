import {by, device, element, expect, waitFor} from 'detox';
import {defineFeature, loadFeature} from 'jest-cucumber';

const feature = loadFeature('./e2e/weapon-specialization.feature');

defineFeature(feature, test => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('weapon specialization add', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      await element(by.id('SettlementBottomTab')).tap();
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      element(by.id('SettlementScreen.ScrollView')).scroll(500, 'down');
      await element(by.id('WeaponSpecializationResetButton')).tap();
    });
    when('I press "Weapon Specialization Add Button"', async () => {
      await element(by.id('WeaponSpecializationAddButton')).tap();
    });
    when('I should see "Weapon Specialization Select Screen"', async () => {
      await expect(
        element(by.id('WeaponSpecializationSelectScreen')),
      ).toBeVisible();
    });
    when('I press "Axe Mastery"', async () => {
      await element(by.text('Axe Mastery')).tap();
    });
    when('I press "Confirm Button"', async () => {
      await element(by.text('CONFIRM')).tap();
    });
    then('I should see "Axe Mastery"', async () => {
      await expect(element(by.id('SettlementScreen'))).toBeVisible();
      await waitFor(element(by.text('Axe Mastery')))
        .toBeVisible()
        .whileElement(by.id('SettlementScreen.ScrollView'))
        .scroll(50, 'down');
      await expect(element(by.text('Axe Mastery'))).toBeVisible();
    });
  });
});
