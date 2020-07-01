Feature: weapon specialization


  Scenario: weapon specialization add
    Given I am any
    When I am at "Settlement Screen"
    And I press "Weapon Specialization Add Button"
    Then I should see "Weapon Specialization Select Screen"
    When I press "Axe Mastery"
    And I press "Confirm Button"
    Then I should see "Axe Mastery"
