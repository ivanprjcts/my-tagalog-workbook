import { expect, test } from '@playwright/test';

const LESSON = '/units/unit-1/lessons/sounds-and-spelling';

test('lesson renders and the first practice question gives feedback', async ({ page }) => {
  await page.goto(LESSON);
  await expect(page.getByRole('heading', { name: 'Sounds and spelling', level: 1 })).toBeVisible();

  const practice = page.locator('#practice');
  await expect(practice).toBeVisible();
  await practice.getByLabel('A', { exact: true }).check();
  await practice.getByRole('button', { name: 'Check answer' }).click();
  await expect(practice.getByText('Correct', { exact: true })).toBeVisible();
  await practice.getByRole('button', { name: 'Next question' }).click();
  await expect(practice.getByText('How many letters are in the modern Filipino alphabet?')).toBeVisible();
});

test('lesson check records completion and survives a reload', async ({ page }) => {
  await page.goto(LESSON);
  const check = page.locator('#lesson-check');

  await check.getByLabel('28 letters', { exact: true }).check();
  await check.getByRole('button', { name: 'Check answer' }).click();
  await check.getByRole('button', { name: 'Next question' }).click();

  await check.getByLabel('Ng', { exact: true }).check();
  await check.getByRole('button', { name: 'Check answer' }).click();
  await check.getByRole('button', { name: 'Next question' }).click();

  await check.getByLabel('salita', { exact: true }).check();
  await check.getByRole('button', { name: 'Check answer' }).click();
  await check.getByRole('button', { name: 'Next question' }).click();

  await check.getByPlaceholder('Type the missing word').fill('bahay');
  await check.getByRole('button', { name: 'Check answer' }).click();
  await check.getByRole('button', { name: 'Next question' }).click();

  await check.getByLabel('Match for a').selectOption({ label: 'a vowel' });
  await check.getByLabel('Match for b').selectOption({ label: 'a consonant' });
  await check.getByLabel('Match for ng').selectOption({ label: 'the /ŋ/ sound' });
  await check.getByRole('button', { name: 'Check answer' }).click();
  await check.getByRole('button', { name: 'Next question' }).click();

  await check.getByLabel('Good evening').check();
  await check.getByRole('button', { name: 'Check answer' }).click();
  await check.getByRole('button', { name: 'Finish' }).click();

  await expect(check.getByText('Passed', { exact: true })).toBeVisible();
  await expect(check.getByRole('heading', { name: /100%/ })).toBeVisible();

  await page.reload();
  await expect(page.getByText('Completed', { exact: true }).first()).toBeVisible();
});

test('review session grades a card and persists the schedule', async ({ page }) => {
  await page.goto('/review');
  await page.getByRole('button', { name: 'Start review' }).click();
  await page.getByRole('button', { name: 'Show answer' }).click();
  await page.getByRole('button', { name: 'Good', exact: true }).click();
  await expect(page.getByText('Card 2 of 10')).toBeVisible();

  const cards = await page.evaluate(() => {
    const raw = localStorage.getItem('tagalog-workbook-progress-v2');
    return raw ? Object.keys(JSON.parse(raw).cards).length : 0;
  });
  expect(cards).toBe(1);
});

test('unit quiz loads and grades the first question', async ({ page }) => {
  await page.goto('/units/unit-1/quiz');
  await expect(page.getByRole('heading', { name: /unit quiz/i, level: 1 })).toBeVisible();
  await page.getByLabel('28 letters', { exact: true }).check();
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.getByText('Correct', { exact: true })).toBeVisible();
});

test('lesson page has no horizontal overflow at 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(LESSON);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
});
