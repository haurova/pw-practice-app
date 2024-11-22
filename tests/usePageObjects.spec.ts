import { expect, test } from '@playwright/test'
import { PageManager } from './page-objects/pageManager'
import { faker } from '@faker-js/faker'


test.beforeEach(async({page}) => {
    await page.goto('/') // this will look for baseURL in config file
})

test('navigate to Form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})


test('parametrized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.name.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.datatype.number(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await page.screenshot({path: 'screenshots/formsLayoutpage.png'})
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', {hasText: "Inline Form"}).screenshot({path: 'screenshots/formsLayoutpage.png'})
    const buffer = await page.screenshot() //saving as binary
    // await pm.navigateTo().datepickerPage()
    // await pm.onDatePickerPage().selectCommonDatePickerFromToday(5)
    // await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(8, 15)

})