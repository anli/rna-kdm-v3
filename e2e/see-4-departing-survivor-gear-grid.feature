@JIRA-KDM-28
Feature: see 4 departing survivor gear grid
  As a user, I want to see the gear grid of all 4 departing survivor, so that I can specify the gear for each specific survivor

  Scenario Outline: see 4 departing survivor gear grid
    Given I am any
    And I am at "Survivors Screen"
    When I press "<button>"
    Then I should see "<button> Gear Grid"

    Examples:
      | button    |
      | survivor1 |
      | survivor2 |
      | survivor3 |
      | survivor4 |
