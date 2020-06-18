Feature: see gear grid
  As a user, I want to have a gear grid, so that I can see my items when I play the game

  @JIRA-KDM-1
  Scenario: No items
    Given I am any
    And data of "Gear Grid" is "Undefined"
    When I am at "Survivors Screen"
    Then I should see "Gear Grid"
    Then I should see "None"
