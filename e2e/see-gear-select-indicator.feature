@JIRA-KDM-27
Feature: see gear select indicator


  Scenario: see gear select indicator at survivors screen
    Given I am any
    And I am at "Survivors Screen"
    When I press "first item"
    Then I should see "first Item Selected Indicator"

  Scenario: see gear select indicator at gear select screen
    Given I am any
    And I am at "Gear Select Screen"
    When I press "Cloth"
    Then I should see "Cloth Selected Indicator"
