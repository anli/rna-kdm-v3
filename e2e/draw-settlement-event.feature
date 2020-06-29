@JIRA-KDM-45
Feature: draw settlement event


  Scenario: draw settlement event
    Given I am any
    When I am at "Settlement Screen"
    And I press "Draw Settlement Event Button"
    Then I should see "Settlement Event"
