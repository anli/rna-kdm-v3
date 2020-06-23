@JIRA-KDM-31
Feature: reset items in gear grid
  As a user, I want to reset all items in gear grid, so that I save my time

  Scenario: reset items in gear grid
    Given I am any
    And data of "First Item" is "Cloth"
    And I am at "Survivors Screen"
    When I press "Gear Reset Button"
    Then I should see "First Item" is "None"
