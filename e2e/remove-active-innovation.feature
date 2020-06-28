Feature: remove active innovation


  Scenario: remove active innovation
    Given I am any
    And data of "Active Innovations" is "Language"
    And I am at "Settlement Screen"
    When I press "Language"
    And I press "Innovation Remove Button"
    Then I should see "No Language"
