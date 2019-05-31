const puppeteer = require('puppeteer');
const testPage = 'https://www.webpagetest.org/'

const lead = {
    url: 'https://yandex.ru/',
    loc: 'Dulles_Aspire17_VA',
    brw: 'IE11'
  };

async function testingPage() {
  const browser = await puppeteer.launch({
    headless: false,
    args : [
      '--window-size=1400,900'
    ]
  });
  const page = await browser.newPage();
  await page.goto(testPage);
  await page.setViewport({
    width: 1400,
    height: 900
  })
  await page.waitFor(1000);
  await page.click('#url');
  await page.type('#url', lead.url);
  await page.select('#location', lead.loc);
  await page.select('#browser', lead.brw);
  await page.click('#start_test-container > p > button');
  await page.waitFor(120000); // таймаут для обхождения капчи на сайте
  await page.waitForSelector('#statusImg', { timeout: 120000 })
  .then(() => console.log('1'));
  await page.waitForSelector('#result > h3', { timeout: 120000 })
  .then(() => console.log('2'));
  await page.waitForSelector('#grades > ul', { timeout: 120000 })
  .then(() => console.log('3'));
  await page.screenshot({path: 'test.png'})
  .then(() => console.log('DONE!'));

  await browser.close();
}

testingPage();