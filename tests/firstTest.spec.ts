import { expect, test } from '@playwright/test'


// test.beforeAll(async({page}) => {

// })

test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    //by Tag name
    await page.locator('input').first().click()

    //by id
    page.locator('#inputEmail')

    //by value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by class value
    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"')

    // combine selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath (not recommended)
    page.locator('//*[@id="inputEmail"]')

    //by partial match
    page.locator(':text(Using)')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('user facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    //await page.getByTitle('IoT Dashboard').click()
    await page.getByTestId('SignIn').click()

})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()


})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

})

test('reusing locators', async({page}) => {

const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})   
const emailField = basicForm.getByRole('textbox', {name: "Email"})
const pwdField = basicForm.getByRole('textbox', {name: "Password"})

    await emailField.fill("test@test.com")
    await pwdField.fill("password123")
    await basicForm.locator('nb-checkbox').click()
    await basicForm.filter({hasText: "Basic form"}).getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})   
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill("test@test.com")
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //value of attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})

test('assertions', async({page}) => {
    //general assertions
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    const value = 5
    expect(value).toEqual(5) 
    
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion
    await expect.soft(basicFormButton).toHaveText("Submit3")
    await basicFormButton.click()
})


// test suite structure
// test.describe('test suite 1', () => {
//     test('the first test', () => {
    
//     })

//     test('the first test', () => {
    
//     })

//     test('the first test', () => {
    
//     })
// })