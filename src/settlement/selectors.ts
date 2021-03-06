import {createSelector} from '@reduxjs/toolkit';
import {shuffle} from '@utils';
import R from 'ramda';
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

const INNOVATIONS = [
  {
    id: 'ultimateWeapon',
    name: 'Ultimate Weapon',
    imageUrl: 'https://imgur.com/UjJCULg.png',
  },
  {
    id: 'guidePost',
    name: 'Guide Post',
    imageUrl: 'https://imgur.com/dWwxorm.png',
  },
  {
    id: 'finalFightingArt',
    name: 'Final Fighting Art',
    imageUrl: 'https://imgur.com/BBrvhhy.png',
  },
  {
    id: 'language',
    name: 'Language',
    unlocks: [
      'ammonia',
      'drums',
      'hovel',
      'innerLantern',
      'paint',
      'symposium',
    ],
    imageUrl: 'https://imgur.com/QYAwlPU.png',
  },
  {
    id: 'ammonia',
    name: 'Ammonia',
    unlocks: ['bloodletting', 'lanternOven'],
    imageUrl: 'https://imgur.com/YzZ1GRA.png',
  },
  {
    id: 'bloodletting',
    name: 'Bloodletting',
    imageUrl: 'https://imgur.com/Xk1ibrA.png',
  },
  {
    id: 'lanternOven',
    name: 'Lantern Oven',
    unlocks: ['cooking', 'scrapSmelting'],
    imageUrl: 'https://imgur.com/UArmKWt.png',
  },
  {
    id: 'cooking',
    name: 'Cooking',
    imageUrl: 'https://imgur.com/o84Vu4V.png',
  },
  {
    id: 'scrapSmelting',
    name: 'Scrap Smelting',
    imageUrl: 'https://imgur.com/0nowTky.png',
  },
  {
    id: 'drums',
    name: 'Drums',
    unlocks: ['forbiddenDance', 'songOfTheBrave'],
    imageUrl: 'https://imgur.com/PHh0AHL.png',
  },
  {
    id: 'forbiddenDance',
    name: 'Forbidden Dance',
    unlocks: ['heartFlute'],
    imageUrl: 'https://imgur.com/YA4PlbO.png',
  },
  {
    id: 'songOfTheBrave',
    name: 'Song of the Brave',
    unlocks: ['saga'],
    imageUrl: 'https://imgur.com/6YLmAwN.png',
  },
  {
    id: 'heartFlute',
    name: 'Heart Flute',
    imageUrl: 'https://imgur.com/X5DWUDh.png',
  },

  {
    id: 'saga',
    name: 'Saga',
    imageUrl: 'https://imgur.com/hGsXKY5.png',
  },

  {
    id: 'hovel',
    name: 'Hovel',
    unlocks: ['bed', 'family', 'partnership'],
    imageUrl: 'https://imgur.com/UJRwE2m.png',
  },
  {
    id: 'bed',
    name: 'Bed',
    imageUrl: 'https://imgur.com/5XVDt59.png',
  },
  {
    id: 'partnership',
    name: 'Partnership',
    imageUrl: 'https://imgur.com/NRAanSH.png',
  },

  {
    id: 'family',
    name: 'Family',
    unlocks: ['clanOfDeath'],
    imageUrl: 'https://imgur.com/c33inre.png',
  },

  {
    id: 'clanOfDeath',
    name: 'Clan of Death',
    imageUrl: 'https://imgur.com/8jk7qwU.png',
  },
  {
    id: 'innerLantern',
    name: 'Inner Lantern',
    unlocks: ['scarification', 'shrine'],
    imageUrl: 'https://imgur.com/iTTbbCd.png',
  },
  {
    id: 'scarification',
    name: 'Scarification',
    imageUrl: 'https://imgur.com/1HRWAZ8.png',
  },
  {
    id: 'shrine',
    name: 'Shrine',
    unlocks: ['sacrifice'],
    imageUrl: 'https://imgur.com/NH8A3e5.png',
  },
  {
    id: 'sacrifice',
    name: 'Sacrifice',
    imageUrl: 'https://imgur.com/sRzys5g.png',
  },
  {
    id: 'paint',
    name: 'Paint',
    unlocks: ['facePainting', 'pictograph', 'sculpture'],
    imageUrl: 'https://imgur.com/Q1hN54n.png',
  },
  {
    id: 'facePainting',
    name: 'FacePainting',
    imageUrl: 'https://imgur.com/lUNeazT.png',
  },
  {
    id: 'pictograph',
    name: 'Pictograph',
    unlocks: ['momentoMori'],
    imageUrl: 'https://imgur.com/FtvzZd4.png',
  },
  {
    id: 'sculpture',
    name: 'Sculpture',
    unlocks: ['pottery'],
    imageUrl: 'https://imgur.com/APkWMhO.png',
  },
  {
    id: 'momentoMori',
    name: 'Momento Mori',
    imageUrl: 'https://imgur.com/1fynlo0.png',
  },
  {
    id: 'pottery',
    name: 'Pottery',
    imageUrl: 'https://imgur.com/y7NGpnq.png',
  },
  {
    id: 'symposium',
    name: 'symposium',
    unlocks: ['nightmareTraining', 'storytelling'],
    imageUrl: 'https://imgur.com/6DW9X7U.png',
  },
  {
    id: 'nightmareTraining',
    name: 'Nightmare Training',
    imageUrl: 'https://imgur.com/PDVUZN5.png',
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    unlocks: ['records', 'warRoom'],
    imageUrl: 'https://imgur.com/5CAOfTv.png',
  },
  {
    id: 'records',
    name: 'Records',
    imageUrl: 'https://imgur.com/N4EhWei.png',
  },
];

const EVENTS = [
  {
    id: 'firstDay',
    name: 'First Day',
    imageUrl: 'https://imgur.com/SXiKUXk.png',
  },
  {
    id: 'acidStorm',
    name: 'Acid Storm',
    imageUrl: 'https://imgur.com/SbAXtLq.png',
  },
  {
    id: 'clingingMist',
    name: 'Clinging Mist',
    imageUrl: 'https://imgur.com/DNOD1pN.png',
  },
  {
    id: 'darkDentist',
    name: 'Dark Dentist',
    imageUrl: 'https://imgur.com/VCR5LVn.png',
  },
  {
    id: 'darkTrader',
    name: 'Dark Trader',
    imageUrl: 'https://imgur.com/4NfLsm5.png',
  },
  {
    id: 'elderCouncil',
    name: 'Elder Council',
    imageUrl: 'https://imgur.com/UxxVqYv.png',
  },
  {
    id: 'cracksInTheGround',
    name: 'Cracks In The Ground',
    imageUrl: 'https://imgur.com/Ey5kDRC.png',
  },
  {
    id: 'glossolalia',
    name: 'Glossolalia',
    imageUrl: 'https://imgur.com/JqW0QPw.png',
  },
  {
    id: 'plague',
    name: 'Plague',
    imageUrl: 'https://imgur.com/toJjfhB.png',
  },
  {
    id: 'heatWave',
    name: ' Heat Wave',
    imageUrl: 'https://imgur.com/squVTYu.png',
  },
  {
    id: 'huntReenactment',
    name: 'Hunt Reenactment',
    imageUrl: 'https://imgur.com/fLG9kVl.png',
  },
  {
    id: 'haunted',
    name: 'Haunted',
    imageUrl: 'https://imgur.com/7odAE1e.png',
  },
  {
    id: 'lightsInTheSky',
    name: 'Lights in the Sky',
    imageUrl: 'https://imgur.com/ietQg5O.png',
  },
  {
    id: 'openMaw',
    name: 'Open Maw',
    imageUrl: 'https://imgur.com/zRMaveO.png',
  },
  {
    id: 'murder',
    name: 'Murder',
    imageUrl: 'https://imgur.com/kB8VcNm.png',
  },
  {
    id: 'nickname',
    name: 'Nickname',
    imageUrl: 'https://imgur.com/pvcv9d4.png',
  },
  {
    id: 'weirdDream',
    name: 'Weird Dream',
    imageUrl: 'https://imgur.com/5sfoz0w.png',
  },
  {
    id: 'skullEater',
    name: 'Skull Eater',
    imageUrl: 'https://imgur.com/7zStGu9.png',
  },
  {
    id: 'rivalry',
    name: 'Rivalry',
    imageUrl: 'https://imgur.com/g6tbjQw.png',
  },
  {
    id: 'strangerInTheDark',
    name: 'Stranger In The Dark',
    imageUrl: 'https://imgur.com/6hILKPc.png',
  },
  {
    id: 'triathlonOfDeath',
    name: 'Triathlon of Death',
    imageUrl: 'https://imgur.com/I9776yD.png',
  },
];

const LOCATIONS = [
  {
    id: 'blacksmith',
    name: 'Blacksmith',
    imageUrl: 'https://imgur.com/3C8ksYs.png',
  },
  {
    id: 'boneSmith',
    name: 'Bone Smith',
    imageUrl: 'https://imgur.com/UIv8Fin.png',
  },
  {
    id: 'catarium',
    name: 'Catarium',
    imageUrl: 'https://imgur.com/QMO8iO8.png',
  },
  {
    id: 'lanternHoard',
    name: 'Lantern Hoard',
    imageUrl: 'https://imgur.com/GzulTR1.png',
  },
  {
    id: 'exhaustedLanternHoard',
    name: 'Exhausted Lantern Hoard',
    imageUrl: 'https://imgur.com/qg2Ik38.png',
  },
  {
    id: 'leatherWorker',
    name: 'Leather Worker',
    imageUrl: 'https://imgur.com/DgMhQ6V.png',
  },
  {
    id: 'maskMaker',
    name: 'Mask Maker',
    imageUrl: 'https://imgur.com/0LdgkT9.png',
  },
  {
    id: 'organGrinder',
    name: 'Organ Grinder',
    imageUrl: 'https://imgur.com/Q6UcPSl.png',
  },
  {
    id: 'plumery',
    name: 'Plumery',
    imageUrl: 'https://imgur.com/LmEr9iY.png',
  },
  {
    id: 'skinnery',
    name: 'Skinnery',
    imageUrl: 'https://imgur.com/jAXYhIA.png',
  },
  {
    id: 'stoneCircle',
    name: 'Stone Circle',
    imageUrl: 'https://imgur.com/qSbRGoJ.png',
  },
  {
    id: 'barberSurgeon',
    name: 'Barber Surgeon',
    imageUrl: 'https://imgur.com/UzsMfr8.png',
  },
  {
    id: 'weaponCrafter',
    name: 'Weapon Crafter',
    imageUrl: 'https://imgur.com/NTzLdYy.png',
  },
];

const WEAPON_SPECIALIZATIONS = [
  {
    id: 'Axe Proficiency',
    name: 'Axe Proficiency',
    imageUrl: 'https://imgur.com/iLrqViR.png',
  },
  {
    id: 'Axe Mastery',
    name: 'Axe Mastery',
    imageUrl: 'https://imgur.com/EpZtPJ2.png',
  },
  {
    id: 'Bow Proficiency',
    name: 'Bow Proficiency',
    imageUrl: 'https://imgur.com/pYSNOB2.png',
  },
  {
    id: 'Bow Mastery',
    name: 'Bow Mastery',
    imageUrl: 'https://imgur.com/6zy2PDF.png',
  },
  {
    id: 'Club Proficiency',
    name: 'Club Proficiency',
    imageUrl: 'https://imgur.com/7LvtXOB.png',
  },
  {
    id: 'Club Mastery',
    name: 'Club Mastery',
    imageUrl: 'https://imgur.com/dVc9fcG.png',
  },
  {
    id: 'Dagger Proficiency',
    name: 'Dagger Proficiency',
    imageUrl: 'https://imgur.com/q899ASg.png',
  },
  {
    id: 'Dagger Mastery',
    name: 'Dagger Mastery',
    imageUrl: 'https://imgur.com/chSLIXn.png',
  },
  {
    id: 'Fist & Tooth Proficiency',
    name: 'Fist & Tooth Proficiency',
    imageUrl: 'https://imgur.com/oaemfIC.png',
  },
  {
    id: 'Fist & Tooth Mastery',
    name: 'Fist & Tooth Mastery',
    imageUrl: 'https://imgur.com/tJDfxwU.png',
  },
  {
    id: 'Grand Weapon Proficiency',
    name: 'Grand Weapon Proficiency',
    imageUrl: 'https://imgur.com/fxxz5m0.png',
  },
  {
    id: 'Grand Weapon Mastery',
    name: 'Grand Weapon Mastery',
    imageUrl: 'https://imgur.com/umoCUOq.png',
  },
  {
    id: 'Katar Proficiency',
    name: 'Katar Proficiency',
    imageUrl: 'https://imgur.com/ndgRw6A.png',
  },
  {
    id: 'Katar Mastery',
    name: 'Katar Mastery',
    imageUrl: 'https://imgur.com/sNytwaA.png',
  },
  {
    id: 'Shield Proficiency',
    name: 'Shield Proficiency',
    imageUrl: 'https://imgur.com/XloN4yz.png',
  },
  {
    id: 'Shield Mastery',
    name: 'Shield Mastery',
    imageUrl: 'hthttps://imgur.com/CIK5lco.png',
  },
  {
    id: 'Spear Proficiency',
    name: 'Spear Proficiency',
    imageUrl: 'https://imgur.com/OgOdUDX.png',
  },
  {
    id: 'Spear Mastery',
    name: 'Spear Mastery',
    imageUrl: 'https://imgur.com/HoHbWPw.png',
  },
  {
    id: 'Sword Proficiency',
    name: 'Sword Proficiency',
    imageUrl: 'https://imgur.com/BfxHpuQ.png',
  },
  {
    id: 'Sword Mastery',
    name: 'Sword Mastery',
    imageUrl: 'https://imgur.com/EGVdYlN.png',
  },
  {
    id: 'Twilight Sword Proficiency',
    name: 'Twilight Sword Proficiency',
    imageUrl: 'https://imgur.com/icJABhj.png',
  },
  {
    id: 'Twilight Sword Mastery',
    name: 'Twilight Sword Mastery',
    imageUrl: 'https://imgur.com/YC17Vf4.png',
  },
  {
    id: 'Whip Proficiency',
    name: 'Whip Proficiency',
    imageUrl: 'https://imgur.com/Fy8Ye08.png',
  },
  {
    id: 'Whip Mastery',
    name: 'Whip Mastery',
    imageUrl: 'https://imgur.com/NnJEKqq.png',
  },
];

const getPrinciples = createSelector<
  any,
  any,
  {[key in PrincipleId]?: PrincipleValue}
>(
  state => state.settlement,
  settlement => settlement?.principles,
);

const getInnovations = createSelector<any, any, any[]>(
  state => state.settlement,
  settlement => {
    const innovationIds = settlement?.innovations || [];

    const innovations = innovationIds.map((innovationId: string) =>
      INNOVATIONS.find(({id}) => id === innovationId),
    );

    return innovations;
  },
);

const drawInnovation = (currentInnovationIds: string[]) => {
  const innovationUnlocks = currentInnovationIds
    .map(n => INNOVATIONS.find(x => x.id === n))
    .filter(n => !R.isNil(n?.unlocks))
    .map(n => n?.unlocks);

  const unlockIds = R.flatten(innovationUnlocks).filter(
    n => !R.contains(n, currentInnovationIds),
  );

  return R.slice(
    0,
    2,
  )(shuffle(unlockIds.map(n => INNOVATIONS.find(x => x.id === n))));
};

const getEvent = createSelector<any, any, any>(
  state => state.settlement,
  settlement => settlement?.event,
);

const getLocations = createSelector<any, any, any[]>(
  state => state.settlement,
  settlement => {
    const locationIds = settlement?.locations || [];

    const locations = locationIds.map((locationId: string) =>
      LOCATIONS.find(({id}) => id === locationId),
    );

    return locations;
  },
);

const getWeaponSpecializations = createSelector<any, any, any[]>(
  state => state.settlement,
  settlement => {
    const itemIds = settlement?.weaponSpecializations || [];

    const data = itemIds.map((itemId: string) =>
      WEAPON_SPECIALIZATIONS.find(({id}) => id === itemId),
    );

    return data;
  },
);

export default class {
  static getPrinciples = getPrinciples;
  static allPrinciples = PRINCIPLES;
  static getInnovations = getInnovations;
  static allInnovations = INNOVATIONS;
  static drawInnovation = drawInnovation;
  static allEvents = EVENTS;
  static getEvent = getEvent;
  static allLocations = LOCATIONS;
  static getLocations = getLocations;
  static allWeaponSpecializations = WEAPON_SPECIALIZATIONS;
  static getWeaponSpecializations = getWeaponSpecializations;
}
