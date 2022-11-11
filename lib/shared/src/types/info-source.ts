import { Countries, Country } from './country';

export enum InfoSourceType {
    Steam = 'steam',
    Switch = 'switch',
    Playstation = 'playstation',
    Epic = 'epic',
    Metacritic = 'metacritic'
}
export type StoreInfoSource =
    | InfoSourceType.Steam
    | InfoSourceType.Switch
    | InfoSourceType.Playstation
    | InfoSourceType.Epic;

export const StoreInfoSources = [
    InfoSourceType.Steam,
    InfoSourceType.Switch,
    InfoSourceType.Playstation,
    InfoSourceType.Epic,
];

export enum InfoSourceState {
    Found = 'Found',
    Resolved = 'Resolved',
    Error = 'Error',
    Disabled = 'Disabled'
}

export interface BaseGameData {
    id: string;
    fullName: string;
    url: string;
}

export interface StorePriceInformation {
    initial?: number;
    final: number;
}

export interface StoreGameData extends BaseGameData {
    thumbnailUrl: string;
    releaseDate?: Date;
    originalReleaseDate?: string;
    priceInformation?: StorePriceInformation;
}

export interface SteamGameData extends StoreGameData {
    categories?: string[];
    genres?: string[];
    controllerSupport?: string;
}

export type SwitchGameData = StoreGameData;

export type PlaystationGameData = StoreGameData;

export type EpicGameData = StoreGameData;

export interface MetacriticData extends BaseGameData {
    criticScore: string;
    userScore: string;
}

// TODO: What do these generics give us except for binding us to details?
export type GameData = {
    [InfoSourceType.Steam]: SteamGameData;
    [InfoSourceType.Switch]: SwitchGameData;
    [InfoSourceType.Playstation]: PlaystationGameData;
    [InfoSourceType.Epic]: EpicGameData;
    [InfoSourceType.Metacritic]: MetacriticData;
};
export type AnyGameData =
    | SteamGameData
    | SwitchGameData
    | PlaystationGameData
    | EpicGameData
    | MetacriticData;

export const SupportedCountries: Record<InfoSourceType, readonly Country[]> = {
    [InfoSourceType.Steam]: Countries,
    [InfoSourceType.Metacritic]: Countries,
    [InfoSourceType.Switch]: Countries.filter(country => country !== 'RU'),
    [InfoSourceType.Playstation]: Countries.filter(country => country !== 'RU'),
    // Currently, it is not clear how epic determines the user origin and therefore the currencies.
    [InfoSourceType.Epic]: [] as const,
} as const;
