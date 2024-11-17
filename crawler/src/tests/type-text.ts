import { TaskFunction } from 'puppeteer-cluster/dist/Cluster.js';

const EDITOR_SELECTOR = '.cm-line';
const targetText = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry.

Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

It was popularised in

`.repeat(1000);

export const runTypeTextTest: TaskFunction<string, void> = async ({
  page,
  data: url,
}) => {
  await page.goto(url); // Move to URL

  await page.waitForSelector(EDITOR_SELECTOR); // Wait for the editor ready
  await page.click(EDITOR_SELECTOR); // Click editor

  // Add spaces between the other crawlers
  const enterCount = 5;
  for (let i = 0; i < enterCount; i++) {
    await page.keyboard.press('Enter');
  }

  // Wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Type one by one
  for (const c of targetText) {
    await page.keyboard.type(c, { delay: 240 });
  }
};
