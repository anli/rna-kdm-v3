@JIRA-KDM-48
Feature: see active settlement locations


  Scenario: see active settlement locations
    Given I am any
    When I am at "Settlement Screen"
    Then I should see "Locations"
