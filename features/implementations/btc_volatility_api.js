import axios from 'axios';

const BASE_URL = 'https://www.google.com/finance/quote/BTC-USD';
const COOKIE_CONSENT = 'SOCS=CAESHAgBEhJnd3NfMjAyNTA0MDktMF9SQzEaAmJnIAEaBgiA_eu_Bg';

export async function fetchBtcPrice() {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'Cookie': COOKIE_CONSENT
            }
        });
        const price = parseFloat(response.data.match(/data-last-price="([^"]+)"/)[1]);
        return price;
    } catch (error) {
        console.error('Error fetching BTC price via API:', error);
        throw error;
    }
}

export async function monitorBtcPriceVolatilityViaApi(intervalMinutes, checkIntervalSeconds) {
    console.log(`Starting BTC volatility monitoring via API for ${intervalMinutes} minutes interval`);
    
    const prices = [];
    
    try {
        // Get initial price
        const initialPrice = await fetchBtcPrice();
        console.log(`Initial BTC price: $${initialPrice}`);

        // Calculate number of checks needed
        const totalChecks = (intervalMinutes * 60) / checkIntervalSeconds;
        
        // Collect prices over the interval
        for (let i = 0; i < totalChecks; i++) {
            const currentPrice = await fetchBtcPrice();
            prices.push(currentPrice);
            console.log(`Check ${i + 1}/${totalChecks}: $${currentPrice}`);
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
    }
}