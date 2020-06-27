@JIRA-KDM-4
Feature: see active innovations
  As a user, I want to see my active innovations, so that I can refer to its details easily

  Scenario: see active innovations
    Given I am any
    When I am at "Settlement Screen"
    Then I should see "Innovations"
