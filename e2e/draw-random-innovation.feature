@JIRA-KDM-44
Feature: Draw 2 random innovation for selection


  Scenario: Draw 2 random innovation for selection
    Given I am any
    And data of "Active Innovations" is "Language"
    When I am at "Settlement Screen"
    And I press "Draw Random Innovation Button"
    Then I should see "Innovation Select Screen"
