import { Type, Faction, Rarity, PlayerClass, Locale, Mechanic, SpellSchool, Race } from '.';

export interface Common {
  cardId: string;
  dbfId: number;
  name: string;
  cardSet: CardSet;
  type: Type;
  faction?: Faction;
  rarity: Rarity;
  health?: number;
  playerClass: PlayerClass;
  locale: Locale;
  artist?: string;
  collectible?: boolean;
  flavor?: string;
  text?: string;
  cost?: number;
  img?: string;
  mechanics?: Mechanic[];
  spellSchool?: SpellSchool;
  imgGold?: string;
  attack?: number;
  race?: Race;
  durability?: number;
  howToGetGold?: string;
}

export enum CardSet {
  AshesOfOutland = 'Ashes of Outland',
  Basic = 'Basic',
  Battlegrounds = 'Battlegrounds',
  DescentOfDragons = 'Descent of Dragons',
  ForgedInTheBarrens = 'Forged in the Barrens',
  FracturedInAlteracValley = 'Fractured in Alterac Valley',
  HeroSkins = 'Hero Skins',
  Legacy = 'Legacy',
  Missions = 'Missions',
  RiseOfShadows = 'Rise of Shadows',
  TavernBrawl = 'Tavern Brawl',
  TheBoomsdayProject = 'The Boomsday Project',
  TheLeagueOfExplorers = 'The League of Explorers',
  Vanilla = 'Vanilla'
}
