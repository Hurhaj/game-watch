import { withBrowser } from "@game-watch/service";
import { InfoSourceType } from "@game-watch/shared";
import axios from "axios";

import { InfoSearcher, InfoSearcherContext, SearchResponse } from "../search-service";
import { matchingName } from "../util/matching-name";

export interface SwitchSearchResponse {
    response: {
        numFound: number;
        docs: Array<{
            url: string;
            title: string;
            pretty_date_s: string;
            price_discounted_f?: number;
            price_regular_f?: number;
            image_url_h2x1_s: string;
        }>
    }
}

// TODO: Does not accept special chars " "?
export const getSwitchSearchResponse = async (search: string) => {
    const { data: { response } } = await axios.get<SwitchSearchResponse>(
        `https://searching.nintendo-europe.com/de/select?q=${search}&fq=type:GAME AND ((playable_on_txt:"HAC")) AND sorting_title:* AND *:*&sort=score desc, date_from desc&start=0&rows=1&bf=linear(ms(priority%2CNOW%2FHOUR)%2C1.1e-11%2C0)`
    );

    return response;
};

export class SwitchSearcher implements InfoSearcher {
    public type = InfoSourceType.Switch;


    public async search(search: string, { logger }: InfoSearcherContext): Promise<SearchResponse | null> {
        const userLanguage = "de";

        return await withBrowser(async browser => {
            if (userLanguage === "de") {
                const { numFound, docs: results } = await getSwitchSearchResponse(search);

                if (!numFound) {
                    logger.debug("No search results found");

                    return null;

                }

                const gameData = results[0];

                if (!matchingName(gameData.title, search)) {
                    logger.debug(`Found name '${gameData.title}' does not include search '${search}'. Skipping`);

                    return null;
                }

                return {
                    remoteGameId: `https://nintendo.de${gameData.url}`,
                    remoteGameName: gameData.title
                };
            }


            await browser.goto(`https://www.nintendo.com/games/game-guide/#filter/:q=${encodeURIComponent(search)}`);
            await browser.waitForSelector(".result-count");

            const resultCount = await browser.$eval(".result-count", el => el.innerHTML);
            if (resultCount.includes("0 results")) {
                logger.debug("No results found");

                return null;
            }

            const gameLink = await browser.$eval("game-tile", el => el.getAttribute("href"));
            const fullName = await browser.$eval("game-tile > h3", el => el.textContent!.trim());

            if (!matchingName(fullName, search)) {
                logger.debug(`Found name '${fullName}' does not include search '${search}'. Skipping`);

                return null;
            }

            return {
                remoteGameId: `https://www.nintendo.com${gameLink}`,
                remoteGameName: fullName
            };
        });
    }
}