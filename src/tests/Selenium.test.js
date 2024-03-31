const { Builder, By, Key, until } = require('selenium-webdriver');

describe('Selenium weather application test', function () {
  let driver;

  beforeAll(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async function() {
    await driver.quit();
  });

  it('should add city to list when searched', async function() {
    await driver.get('http://localhost:3000');

    const searchInput = await driver.findElement(By.css('[data-testid="search-input"]'));
    await searchInput.sendKeys('Melbourne', Key.RETURN);

    const searchButton = await driver.findElement(By.css('[data-testid="search-button"]'));
    await searchButton.click();

    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Melbourne')]")), 5000);

    const cityName = await driver.findElement(By.xpath("//*[contains(text(), 'Melbourne')]")).getText();
    expect(cityName).toEqual('Melbourne');
  }, 10000);
});