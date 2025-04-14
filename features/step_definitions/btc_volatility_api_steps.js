import { Given, When, Then } from '@cucumber/cucumber';
import { monitorBtcPriceVolatilityViaApi } from '../implementations/btc_volatility_api.js';

let volatilityResults;

Given('I start monitoring BTC USD price via API', function () {
    volatilityResults = null;
});

When('I collect prices via API every 10 seconds for {int} minutes', async function (interval) {
    volatilityResults = await monitorBtcPriceVolatilityViaApi(interval, 10);
});

Then('the average price should not vary by more than 1% from initial price', function () {
    if (volatilityResults.averageDeviation > 1) {
        throw new Error(`Average price deviation (${volatilityResults.averageDeviation}%) exceeds 1% threshold`);
    }
});

Then('no single price should vary by more than 2% from initial price', function () {
    const maxDeviation = Math.max(volatilityResults.maxDeviation, volatilityResults.minDeviation);
    if (maxDeviation > 2) {
        throw new Error(`Maximum price deviation (${maxDeviation}%) exceeds 2% threshold`);
    }
}); 