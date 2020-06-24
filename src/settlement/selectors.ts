import {createSelector} from '@reduxjs/toolkit';
import {PrincipleId, PrincipleValue} from './get-slice';

const PRINCIPLES = {
  newLife: [
    {
      id: 'protectTheYoung',
      imageUrl: 'https://imgur.com/yFC0RJw.png',
      name: 'Protect the Young',
    },
    {
      id: 'survivalOfTheFittest',
      imageUrl: 'https://imgur.com/3J7hf4Q.png',
      name: 'Survival of the Fittest',
    },
  ],
  death: [
    {
      id: 'graves',
      imageUrl: 'https://imgur.com/6WbK6SI.png',
      name: 'Graves',
    },
    {
      id: 'cannibalize',
      imageUrl: 'https://imgur.com/UnpL9tO.png',
      name: 'Cannibalize',
    },
  ],
  conviction: [
    {
      id: 'barbaric',
      imageUrl: 'https://imgur.com/1XLzyd5.png',
      name: 'Barbaric',
    },
    {
      id: 'romantic',
      imageUrl: 'https://imgur.com/DwRJvjy.png',
      name: 'Romantic',
    },
  ],
  society: [
    {
      id: 'acceptDarkness',
      imageUrl: 'https://imgur.com/vMSBB8T.png',
      name: 'Accept Darkness',
    },
    {
      id: 'collectiveToll',
      imageUrl: 'https://imgur.com/4ccckFI.png',
      name: 'Collective Toll',
    },
  ],
};

const getPrinciples = createSelector<
  any,
  any,
  {[key in PrincipleId]?: PrincipleValue}
>(
  state => state.settlement,
  settlement => settlement?.principles,
);

export default class {
  static getPrinciples = getPrinciples;
  static allPrinciples = PRINCIPLES;
}
