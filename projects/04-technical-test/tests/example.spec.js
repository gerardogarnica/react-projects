// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const textContent = await page.getByRole('paragraph').textContent()
  const imageSrc = await page.getByRole('img').getAttribute('src')

  console.log({ textContent, imageSrc })

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBe(true)
})
