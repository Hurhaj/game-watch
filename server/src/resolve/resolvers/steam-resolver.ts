import { Logger } from "@nestjs/common";
import axios from "axios";

import { InfoSourceType, SteamGameData } from "../../info-source/info-source-model";
import { InfoResolver } from "../resolve-service";


/**
 * TODO:
 * - Add offer end date => We need to make a second api call
 * - Currency is random
 * => Maybe we need browser language
 */
export class SteamResolver implements InfoResolver {
    public type = InfoSourceType.Steam;

    private readonly logger = new Logger(SteamResolver.name);

    public async resolve(id: string): Promise<SteamGameData> {
        console.time("Resolve Steam");

        const { data } = await axios.get<any>(
            `https://store.steampowered.com/api/appdetails?appids=${id}`
        );
        console.timeEnd("Resolve Steam");

        const gameData = data[id];

        const { success } = gameData;
        if (!success) {
            throw new Error("Steam API request unsuccessful");
        }

        const json = gameData.data as Record<string, any>;

        try {
            if (!json.price_overview && !json.is_free) {
                // TODO: We need to open the site to get the price.
            }

            return {
                id,
                fullName: json.name,
                storeUrl: `https://store.steampowered.com/app/${id}`,
                thumbnailUrl: json.header_image,
                releaseDate: json.release_date.date,
                priceInformation: json.price_overview ? {
                    initial: json.price_overview.initial_formatted,
                    final: json.price_overview.final_formatted,
                    discountPercentage: json.price_overview.discount_percent,
                } : undefined,
                controllerSupport: json.controller_support,
                categories: json.categories ? Object.values(json.categories).map(({ description }) => description) : undefined,
                genres: json.genres ? Object.values(json.genres).map(({ description }) => description) : undefined,
            };
        } catch (error) {
            this.logger.error("Steam api response was malformed", { data });
            throw error;
        }
    }
}