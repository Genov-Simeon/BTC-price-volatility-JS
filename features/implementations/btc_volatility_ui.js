import { Builder, By, until } from 'selenium-webdriver';

const ROBOTS_URL = 'https://www.google.com/robots.txt';
const BASE_URL = 'https://www.google.com/finance/quote/BTC-USD';
const COOKIE_CONSENT = 'CAESOAgSEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjUwNDA5LjA0X3AwGgVlbi1VUyACGgYIgP3rvwY';

export async function fetchBtcPrice(driver) {
    try {
        if (!driver) {
            driver = await new Builder().forBrowser('chrome').build();
        }
        
        // Set cookie and refresh page
        await driver.get(ROBOTS_URL);
        await driver.manage().addCookie({
            name: 'SOCS',
            value: COOKIE_CONSENT,
            domain: '.google.com',
        });
        await driver.get(BASE_URL);
        
        const priceElement = await driver.wait(
            until.elementLocated(By.css('[data-last-price]')),
            10000
        );
        const priceText = await priceElement.getAttribute('data-last-price');
        return { price: parseFloat(priceText), driver };
    } catch (error) {
        console.error('Error fetching BTC price via UI:', error);
        driver && await driver.quit();
        throw error;
    }
}

export async function monitorBtcPriceVolatilityViaUi(intervalMinutes, checkIntervalSeconds) {
    console.log(`Starting BTC volatility monitoring via UI for ${intervalMinutes} minutes interval`);
    
    let driver = null;
    const prices = [];
    
    try {
        // Get initial price
        const initialResult = await fetchBtcPrice(driver);
        const initialPrice = initialResult.price;
        driver = initialResult.driver;
        console.log(`Initial BTC price: $${initialPrice}`);

        // Calculate number of checks needed
        const totalChecks = (intervalMinutes * 60) / checkIntervalSeconds;
        
        // Collect prices over the interval
        for (let i = 0; i < totalChecks; i++) {
            const result = await fetchBtcPrice(driver);
            prices.push(result.price);
            driver = result.driver;
            console.log(`Check ${i + 1}/${totalChecks}: $${result.price}`);
            await new Promise(resolve => setTimeout(resolve, checkIntervalSeconds * 1000));
        }

        // Calculate volatility metrics
        const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        
        const averageDeviation = Math.abs((averagePrice - initialPrice) / initialPrice) * 100;
        const maxDeviation = Math.abs((maxPrice - initialPrice) / initialPrice) * 100;
        const minDeviation = Math.abs((minPrice - initialPrice) / initialPrice) * 100;

        return {
            initialPrice,
            averagePrice,
            maxPrice,
            minPrice,
            averageDeviation,
            maxDeviation,
            minDeviation,
            passed: averageDeviation <= 1 && Math.max(maxDeviation, minDeviation) <= 2
        };
    } catch (error) {
        console.error('Error during BTC volatility monitoring:', error);
        throw error;
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}