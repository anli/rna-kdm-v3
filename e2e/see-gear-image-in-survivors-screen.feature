Feature: see gear image in survivors screen


  Scenario Outline: see gear image in survivors screen
    Given I am any
    And data of "First Gear" is "<item>"
    And I am at "Survivors Screen"
    When I press "First Gear"
    Then I should see "Preview" is "<result>"

    Examples:
      | item  | result  |
      | Cloth | Cloth   |
      | None  | Nothing |
