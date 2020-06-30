@JIRA-KDM-46
Feature: add location


  Scenario: add location
    Given I am any
    When I am at "Settlement Screen"
    And I press "Location Add Button"
    And I should see "Location Select Screen"
    And I press "Lantern Hoard"
    And I press "Confirm Button"
    Then I should see "Lantern Hoard"
