@JIRA-KDM-2
Feature: see active principles
  As a user, I want to see my active principles, so that I can refer to its details easily

  Scenario: see active principles
    Given I am any
    When I am at "Settlement Screen"
    Then I should see "Principles"
