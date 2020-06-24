@JIRA-KDM-38
Feature: remove active principle
  As a user, I want to remove an active principle, so that I can undo when I make a mistake

  Scenario: remove active principle
    Given I am any
    And data of "New Life" is "Protect the Young"
    And I am at "Settlement Screen"
    When I press "New Life"
    And I press "Remove Principle Button"
    Then I should not see "Protect the Young"
