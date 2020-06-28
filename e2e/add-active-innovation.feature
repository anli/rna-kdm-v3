Feature: add active innovation


  Scenario: reset active innovation
    Given I am any
    And data of "Innovation" is "Language"
    When I am at "Settlement Screen"
    And I press "Innovation Reset Button"
    Then I should see "No Innovations"

  Scenario: add active innovation
    Given I am any
    When I am at "Settlement Screen"
    And I press "Innovation Add Button"
    Then I should see "Innovation Select Screen"
    When I press "Language"
    And I press "Confirm Button"
    Then I should see "Language"
