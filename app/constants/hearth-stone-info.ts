export interface Info {
  type: string;
  properties: Properties;
}

export interface Properties {
  patch: Patch;
  classes: Classes;
  sets: Classes;
  types: Classes;
  factions: Classes;
  qualities: Classes;
  races: Classes;
  locales: Classes;
}

export interface Classes {
  type: string;
  items: Patch;
}

export interface Patch {
  type: string;
}
