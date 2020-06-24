@JIRA-KDM-3
Feature: see active principle preview
  As a user, I want to update a principle as active, so that I can see its detail

  Scenario: see active principle preview
    Given I am any
    And data of "New life" is "Protect the Young"
    And I am at "Settlement Screen"
    When I press "Protect the Young"
    Then I should see "Protect the Young Preview"
    When I press "Principle Select Button"
    And I should see "Principle Select Screen"
    And I press "Survival of the Fittest"
    Then I should see Survival of the Fittest Preview
