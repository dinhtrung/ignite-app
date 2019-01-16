const Utils = require('../utils')

describe('Partner Screen Tests', () => {
  before(async () => {
    await device.reloadReactNative()
    await Utils.loginAsUser()
  })
  after(async () => {
    await element(by.type('_UIBackButtonContainerView')).tap()
    await element(by.type('_UIBackButtonContainerView')).tap()
    await Utils.logout()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await navigateToPartnerScreen()
  })

  const navigateToPartnerScreen = async () => {
    await expect(element(by.id('launchScreen'))).toBeVisible()
    await element(by.id('menuButton')).tap()
    await element(by.id('entitiesDrawerButton')).tap()
    await element(by.id('partnerEntityScreenButton')).tap()
  }

  it('should allow you to create an entity', async () => {
    await expect(element(by.id('partnerScreen'))).toBeVisible()
    await expect(element(by.text('Create'))).toBeVisible()
    // create
    await element(by.text('Create').and(by.type('UIButtonLabel'))).tap()
    await element(by.id('nameInput')).replaceText('sample-data')
    await element(by.id('codeInput')).replaceText('sample-data')
    await element(by.id('stateInput')).replaceText('123')
    await element(by.id('descriptionInput')).replaceText('sample-data')
    await element(by.id('logoInput')).replaceText('sample-data')
    await element(by.id('vcardInput')).replaceText('sample-data')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('View')).tap()
    await expect(element(by.id('name'))).toHaveText('Name: sample-data')
    await expect(element(by.id('code'))).toHaveText('Code: sample-data')
    await expect(element(by.id('state'))).toHaveText('State: 123')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data')
    await expect(element(by.id('logo'))).toHaveText('Logo: sample-data')
    await expect(element(by.id('vcard'))).toHaveText('Vcard: sample-data')
    // update
    await element(by.text('EDIT')).tap()
    await element(by.id('nameInput')).replaceText('sample-data-2')
    await element(by.id('codeInput')).replaceText('sample-data-2')
    await element(by.id('stateInput')).replaceText('1234')
    await element(by.id('descriptionInput')).replaceText('sample-data-2')
    await element(by.id('logoInput')).replaceText('sample-data-2')
    await element(by.id('vcardInput')).replaceText('sample-data-2')
    await waitFor(element(by.id('submitButton'))).toBeVisible().whileElement(by.id('entityScrollView')).scroll(50, 'down')
    await element(by.id('submitButton')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('name'))).toHaveText('Name: sample-data-2')
    await expect(element(by.id('code'))).toHaveText('Code: sample-data-2')
    await expect(element(by.id('state'))).toHaveText('State: 1234')
    await expect(element(by.id('description'))).toHaveText('Description: sample-data-2')
    await expect(element(by.id('logo'))).toHaveText('Logo: sample-data-2')
    await expect(element(by.id('vcard'))).toHaveText('Vcard: sample-data-2')
    // delete
    await element(by.text('DELETE')).tap()
    await element(by.text('OK')).tap()
    await expect(element(by.id('partnerScreen'))).toBeVisible()
  })
})
