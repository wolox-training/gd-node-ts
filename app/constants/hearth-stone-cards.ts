export interface Allcards {
  Basic: Basic[];
  Classic: AshesOfOutland[];
  'Hall of Fame': AshesOfOutland[];
  Missions: AshesOfOutland[];
  Demo: string[];
  System: string[];
  Debug: string[];
  Promo: string[];
  Naxxramas: AshesOfOutland[];
  'Goblins vs Gnomes': AshesOfOutland[];
  'Blackrock Mountain': AshesOfOutland[];
  'The Grand Tournament': AshesOfOutland[];
  Credits: Credit[];
  'Hero Skins': AshesOfOutland[];
  'Tavern Brawl': AshesOfOutland[];
  'The League of Explorers': AshesOfOutland[];
  'Whispers of the Old Gods': AshesOfOutland[];
  'One Night in Karazhan': AshesOfOutland[];
  'Mean Streets of Gadgetzan': AshesOfOutland[];
  "Journey to Un'Goro": AshesOfOutland[];
  'Knights of the Frozen Throne': AshesOfOutland[];
  'Kobolds & Catacombs': AshesOfOutland[];
  'The Witchwood': AshesOfOutland[];
  'The Boomsday Project': AshesOfOutland[];
  "Rastakhan's Rumble": AshesOfOutland[];
  'Rise of Shadows': AshesOfOutland[];
  'Taverns of Time': AshesOfOutland[];
  'Saviors of Uldum': AshesOfOutland[];
  'Descent of Dragons': AshesOfOutland[];
  "Galakrond's Awakening": AshesOfOutland[];
  'Ashes of Outland': AshesOfOutland[];
  'Wild Event': string[];
  'Scholomance Academy': AshesOfOutland[];
  Battlegrounds: AshesOfOutland[];
  'Demon Hunter Initiate': AshesOfOutland[];
  'Madness At The Darkmoon Faire': AshesOfOutland[];
  'Forged in the Barrens': AshesOfOutland[];
  Legacy: AshesOfOutland[];
  Core: AshesOfOutland[];
  Vanilla: AshesOfOutland[];
  'Wailing Caverns': string[];
  'United in Stormwind': AshesOfOutland[];
  Mercenaries: AshesOfOutland[];
  'Fractured in Alterac Valley': AshesOfOutland[];
  'Voyage to the Sunken City': AshesOfOutland[];
  Unknown: AshesOfOutland[];
}

export interface AshesOfOutland {
  cardId: string;
  dbfId: string;
  name: string;
  cardSet: AshesOfOutlandCardSet;
  type?: Type;
  text?: string;
  playerClass?: PlayerClass;
  locale: Locale;
  rarity?: Rarity;
  health?: number;
  mechanics?: Mechanic[];
  faction?: Faction;
  elite?: boolean;
  cost?: number;
  attack?: number;
  race?: Race;
  img?: string;
  flavor?: string;
  artist?: string;
  spellSchool?: SpellSchool;
  collectible?: boolean;
  imgGold?: string;
  durability?: number;
  howToGetGold?: string;
  howToGet?: string;
  armor?: string;
  classes?: PlayerClass[];
  multiClassGroup?: string;
  howToGetDiamond?: string;
}

export enum AshesOfOutlandCardSet {
  AshesOfOutland = 'Ashes of Outland',
  Battlegrounds = 'Battlegrounds',
  BlackrockMountain = 'Blackrock Mountain',
  Classic = 'Classic',
  Core = 'Core',
  DemonHunterInitiate = 'Demon Hunter Initiate',
  DescentOfDragons = 'Descent of Dragons',
  ForgedInTheBarrens = 'Forged in the Barrens',
  FracturedInAlteracValley = 'Fractured in Alterac Valley',
  GalakrondSAwakening = "Galakrond's Awakening",
  GoblinsVsGnomes = 'Goblins vs Gnomes',
  HallOfFame = 'Hall of Fame',
  HeroSkins = 'Hero Skins',
  JourneyToUnGoro = "Journey to Un'Goro",
  KnightsOfTheFrozenThrone = 'Knights of the Frozen Throne',
  KoboldsCatacombs = 'Kobolds & Catacombs',
  Legacy = 'Legacy',
  MadnessAtTheDarkmoonFaire = 'Madness At The Darkmoon Faire',
  MeanStreetsOfGadgetzan = 'Mean Streets of Gadgetzan',
  Mercenaries = 'Mercenaries',
  Missions = 'Missions',
  Naxxramas = 'Naxxramas',
  OneNightInKarazhan = 'One Night in Karazhan',
  RastakhanSRumble = "Rastakhan's Rumble",
  RiseOfShadows = 'Rise of Shadows',
  SaviorsOfUldum = 'Saviors of Uldum',
  ScholomanceAcademy = 'Scholomance Academy',
  TavernBrawl = 'Tavern Brawl',
  TavernsOfTime = 'Taverns of Time',
  TheBoomsdayProject = 'The Boomsday Project',
  TheGrandTournament = 'The Grand Tournament',
  TheLeagueOfExplorers = 'The League of Explorers',
  TheWitchwood = 'The Witchwood',
  UnitedInStormwind = 'United in Stormwind',
  Unknown = 'Unknown',
  Vanilla = 'Vanilla',
  VoyageToTheSunkenCity = 'Voyage to the Sunken City',
  WhispersOfTheOldGods = 'Whispers of the Old Gods'
}

export enum PlayerClass {
  DeathKnight = 'Death Knight',
  DemonHunter = 'Demon Hunter',
  Dream = 'Dream',
  Druid = 'Druid',
  Hunter = 'Hunter',
  Mage = 'Mage',
  Neutral = 'Neutral',
  Paladin = 'Paladin',
  Priest = 'Priest',
  Rogue = 'Rogue',
  Shaman = 'Shaman',
  Warlock = 'Warlock',
  Warrior = 'Warrior',
  Whizbang = 'Whizbang'
}

export enum Faction {
  Alliance = 'Alliance',
  Horde = 'Horde',
  Neutral = 'Neutral'
}

export enum Locale {
  EnUS = 'enUS'
}

export interface Mechanic {
  name: Name;
}

export enum Name {
  AIMustPlay = 'AIMustPlay',
  Adapt = 'Adapt',
  AdjacentBuff = 'AdjacentBuff',
  AffectedBySpellPower = 'AffectedBySpellPower',
  Aura = 'Aura',
  AvengeX = 'Avenge (X)',
  Battlecry = 'Battlecry',
  BloodGem = 'Blood Gem',
  CastsWhenDrawn = 'Casts When Drawn',
  Charge = 'Charge',
  ColossalX = 'Colossal +X',
  Combo = 'Combo',
  Corrupt = 'Corrupt',
  Deathrattle = 'Deathrattle',
  Discover = 'Discover',
  DivineShield = 'Divine Shield',
  Dormant = 'Dormant',
  Dredge = 'Dredge',
  Echo = 'Echo',
  Freeze = 'Freeze',
  Frenzy = 'Frenzy',
  HonorableKill = 'Honorable Kill',
  ImmuneToSpellpower = 'ImmuneToSpellpower',
  Inspire = 'Inspire',
  InvisibleDeathrattle = 'InvisibleDeathrattle',
  Invoke = 'Invoke',
  JadeGolem = 'Jade Golem',
  Lifesteal = 'Lifesteal',
  Magnetic = 'Magnetic',
  Morph = 'Morph',
  NatureSpellDamage = 'Nature Spell Damage',
  OneTurnEffect = 'OneTurnEffect',
  Outcast = 'Outcast',
  Overkill = 'Overkill',
  Overload = 'Overload',
  Poisonous = 'Poisonous',
  Quest = 'Quest',
  Questline = 'Questline',
  Reborn = 'Reborn',
  Recruit = 'Recruit',
  Rush = 'Rush',
  Secret = 'Secret',
  Sidequest = 'Sidequest',
  Silence = 'Silence',
  SpellDamage = 'Spell Damage',
  Spellburst = 'Spellburst',
  Spellcraft = 'Spellcraft',
  Stealth = 'Stealth',
  Summoned = 'Summoned',
  Taunt = 'Taunt',
  Tradeable = 'Tradeable',
  Twinspell = 'Twinspell',
  Windfury = 'Windfury'
}

export enum Race {
  All = 'All',
  Beast = 'Beast',
  Demon = 'Demon',
  Dragon = 'Dragon',
  Elemental = 'Elemental',
  Mech = 'Mech',
  Murloc = 'Murloc',
  Naga = 'Naga',
  Pirate = 'Pirate',
  Quilboar = 'Quilboar',
  Totem = 'Totem'
}

export enum Rarity {
  Common = 'Common',
  Epic = 'Epic',
  Free = 'Free',
  Legendary = 'Legendary',
  Rare = 'Rare'
}

export enum SpellSchool {
  Arcane = 'Arcane',
  Fel = 'Fel',
  Fire = 'Fire',
  Frost = 'Frost',
  Holy = 'Holy',
  Nature = 'Nature',
  Shadow = 'Shadow'
}

export enum Type {
  Enchantment = 'Enchantment',
  Hero = 'Hero',
  HeroPower = 'Hero Power',
  Minion = 'Minion',
  Spell = 'Spell',
  Weapon = 'Weapon'
}

export interface Basic {
  cardId: string;
  dbfId: string;
  name: string;
  cardSet: string;
  type: Type;
  faction?: PlayerClass;
  rarity?: Rarity;
  cost: number;
  text: string;
  playerClass: PlayerClass;
  locale: Locale;
}

export interface Credit {
  cardId: string;
  dbfId: string;
  name: string;
  cardSet: CreditCardSet;
  type: Type;
  rarity: Rarity;
  cost: number;
  attack: number;
  health?: number;
  text: string;
  elite: boolean;
  playerClass: PlayerClass;
  locale: Locale;
  race?: Race;
  mechanics?: Mechanic[];
}

export enum CreditCardSet {
  Credits = 'Credits'
}
