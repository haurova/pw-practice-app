import {test as base } from '@playwright/test'
import { PageManager } from './tests/page-objects/pageManager'

export type TestOptions = {
    globalsQAUrl: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQAUrl: ['', {option: true}],

    // formLayoutsPage: [async({page}, use) => {
    //     await page.goto('/')
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()   
    //     await use('')
    // }, {auto: true}], 

    formLayoutsPage: async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()   
        await use('')
        console.log('Tear down')
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }
})