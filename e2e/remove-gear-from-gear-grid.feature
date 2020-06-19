@JIRA-KDM-9
Feature: remove gear from gear grid
  As a user, I want to remove item from my gear grid, so that I can undo if I add a item by mistake

  Scenario: remove gear from gear grid
    Given I am any
    And data of "First Gear" is "Cloth"
    And I am at "Survivors Screen"
    And I press "First Gear"
    When I press "Remove Gear"
    Then I should see "First Item" is "None"
