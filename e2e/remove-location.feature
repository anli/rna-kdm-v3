@JIRA-KDM-47
Feature: remove location


  Scenario: remove location
    Given I am any
    And data of "Locations" is "Blacksmith"
    When I am at "Settlement Screen"
    And I press "Blacksmith"
    And I press "Location Remove Button"
    Then I should see "No Blacksmith"
