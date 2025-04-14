1. CodingTask
For the needs of our crypto trading engine, we need to test the volatility of the BTC-USD pair
on the Google Finance website Real-time Quote BTC-USD - Google Finance.
For the API solution please use the API that is feeding the Real-time Quote BTC-USD - Google
Finance - hps://www.google.com/finance/quote/BTC-USD.
We need to verify that:
● The average BTC-USD price in a given time interval (N minutes) does not vary by more
than 1% compared to the initial recorded value, given a reading is made every M
seconds.
● There are no values in the given time interval (N minutes) that vary by more than 2%,
given a reading is made every M seconds
*N = 1,3,5
*M = 10
ExpectedOutput:
● Working and configured automation tests, implemented in JavaScript
● API solution(without UI)
● UI solution(Selenium based)
● Good to have, but not mandatory Cucumber and Gherkin
● Runnable test cases implemented with the above framework.
