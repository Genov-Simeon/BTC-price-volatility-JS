BTC-USD Volatility Monitoring Automation
📌 Task Description
For the needs of our crypto trading engine, we need to test the volatility of the BTC-USD pair on the Google Finance website:

🔗 Real-time Quote BTC-USD - Google Finance

✅ Requirements
We need to verify that:

✅ The average BTC-USD price over a given time interval (N minutes) does not vary by more than 1% compared to the initial recorded value, with a reading taken every M seconds.

✅ No individual price in the same interval should vary by more than 2% from the initial recorded value.

⏱ Parameters
N (time interval in minutes): 1, 3, 5

M (interval between readings in seconds): 10

✅ Expected Output
A working and fully configured set of automation tests, implemented in JavaScript.

API solution (without UI): To fetch and validate real-time BTC-USD price volatility.

UI solution (Selenium-based): To verify price updates directly from the website.

Cucumber + Gherkin support (optional but good to have): To define readable, behavior-driven tests.

Fully runnable test cases using the above frameworks.
