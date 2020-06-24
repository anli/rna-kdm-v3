@JIRA-KDM-37
Feature: add active principle
  As a user, I want to add a active principle, so that I can see what is active in my settlement

  Scenario Outline: add active principle
    Given I am any
    And I am at "Settlement Screen"
    When I press "Principle New Life"
    And I press "Principle Select Button"
    Then I should see "Principle Select Screen"
    And I press "Protect the Young"
    And I press "<button>"
    Then I should see "<result>"

    Examples:
      | button  | result                     |
      | CONFIRM | Protect the Young Selected |
      | CANCEL  | Nothing Selected           |
