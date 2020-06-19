@JIRA-KDM-8
Feature: add gear to gear grid
  As a user, I want to add item to my gear grid, so that I can use the gear grid during my game

  Scenario Outline: default
    Given I am any
    And data of "First Item" is "None"
    And I am at "Survivors Screen"
    And I press "First Gear"
    And I press "Add Gear"
    And I am at "Gear Select Screen"
    And I press "Cloth"
    When I press "<button>"
    Then I should see "Survivor Screen"
    And I should see "First Item" is "<result>"

    Examples:
      | button  | result |
      | CONFIRM | Cloth  |
      | CANCEL  | None   |
