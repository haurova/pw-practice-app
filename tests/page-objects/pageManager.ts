import { Page } from "@playwright/test";
import { NavigationPage } from './navigationPage'
import { FormLayoutPage } from './formLayoutsPage'
import { DatePicketPage } from './datePickerPage'

export class PageManager {

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutPage: FormLayoutPage
    private readonly datePickerPage: DatePicketPage


    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutPage = new FormLayoutPage(this.page)
        this.datePickerPage = new DatePicketPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage() {
        return this.formLayoutPage
    }

    onDatePickerPage() {
        return this.datePickerPage
    }

}