Feature: BTC USD Volatility Testing via API
  As a crypto trading engine
  I want to verify BTC USD price volatility using the API
  So that I can ensure price stability within acceptable ranges

  Scenario Outline: Verify BTC USD price volatility over <interval> minutes via API
    Given I start monitoring BTC USD price via API
    When I collect prices via API every 10 seconds for <interval> minutes
    Then the average price should not vary by more than 1% from initial price
    And no single price should vary by more than 2% from initial price

    Examples:
      | interval |
      | 1        |
      | 3        |
      | 5        | 