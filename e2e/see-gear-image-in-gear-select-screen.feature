@JIRA-KDM-26
Feature: see gear image in gear select screen


  Scenario: see gear image in gear select screen
    Given I am any
    And I am at "Gear Select Screen"
    When I press "Cloth"
    Then I should see "Preview" is "Cloth"
