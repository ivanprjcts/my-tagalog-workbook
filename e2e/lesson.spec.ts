import { expect, test } from '@playwright/test';

const LESSON = '/units/unit-1/lessons/sounds-and-spelling';

test('lesson renders and the first practice question gives feedback', async ({ page }) => {
  await page.goto(LESSON);
  await expect(page.getByRole('heading', { name: 'Sounds and spelling', level: 1 })).toBeVisible();
  await expect(page.getByText('/ˈbasa/').first()).toBeVisible();
  await expect(page.getByText('/ˈbahaj/').first()).toBeVisible();
  await expect(page.getByText('/ʔaˈma/').first()).toBeVisible();
  await expect(page.getByText('/ˈʔoɾas/').first()).toBeVisible();
  await expect(page.getByText('/ˈʔulo/').first()).toBeVisible();

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

test('lesson audio uses a pre-recorded Tagalog file', async ({ page }) => {
  await page.goto(LESSON);
  const responsePromise = page.waitForResponse(
    (response) => response.url().includes('/audio/') && response.url().endsWith('.mp3'),
  );
  await page.getByRole('button', { name: 'Listen to titik' }).click();
  const response = await responsePromise;
  expect([200, 206]).toContain(response.status());
  await expect(page.getByText(/No Tagalog voice|no Tagalog device voice/)).toHaveCount(0);
});

test('stress and glottal minimal pairs use the custom recordings', async ({ page }) => {
  await page.goto(LESSON);
  const pairs = [
    ['báka', 'baka-first-stress.mp3'],
    ['baká', 'baka-final-stress.mp3'],
    ['bása', 'basa-read.mp3'],
    ['basâ', 'basa-wet.mp3'],
  ] as const;

  for (const [word, file] of pairs) {
    const responsePromise = page.waitForResponse((response) => response.url().includes(`/audio/custom/${file}`));
    await page.getByRole('button', { name: `Listen to ${word}` }).click();
    expect([200, 206]).toContain((await responsePromise).status());
  }
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

test('Unit 2 lessons load and the first exercise gives feedback', async ({ page }) => {
  await page.goto('/units/unit-2/lessons/ang-ng-sa');
  await expect(page.getByRole('heading', { name: 'Ang, ng and sa', level: 1 })).toBeVisible();
  const practice = page.locator('#practice');
  await practice.getByLabel('ang', { exact: true }).check();
  await practice.getByRole('button', { name: 'Check answer' }).click();
  await expect(practice.getByText('Correct', { exact: true })).toBeVisible();

  const slugs = ['si-ni-kay', 'ito-iyan-iyon', 'adjectives-and-linker', 'possession', 'descriptions-and-family'];
  for (const slug of slugs) {
    await page.goto(`/units/unit-2/lessons/${slug}`);
    await expect(page.locator('h1').first()).toBeVisible();
  }
});

test('Unit 2 unit quiz loads', async ({ page }) => {
  await page.goto('/units/unit-2/quiz');
  await expect(page.getByRole('heading', { name: /unit quiz/i, level: 1 })).toBeVisible();
  await expect(page.getByText('18 questions', { exact: true })).toBeVisible();
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
