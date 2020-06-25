@JIRA-KDM-30
Feature: search item in gear select


  Scenario: search item in gear select
    Given I am any
    And I am at "Gear Select Screen"
    When I search "Bone Blade"
    Then I should see "Bone Blade"
