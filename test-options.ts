import {test as base} from '@playwright/test'

export type TestOptions = {
    globalSQAURL: string
}

export const test = base.extend<TestOptions>({
    globalSQAURL: ['', {option: true}]
})