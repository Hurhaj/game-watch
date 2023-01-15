import { InfoSourceType, ProtonGameData } from '@game-watch/shared';
import { AxiosInstance } from 'axios';

import { InfoResolver, InfoResolverContext } from '../resolve-service';

export class ProtonResolver implements InfoResolver {
    public type = InfoSourceType.Proton;

    public constructor(private readonly axios: AxiosInstance) { }

    public async resolve({ source }: InfoResolverContext): Promise<ProtonGameData> {
        const { data: { hits } } = await this.axios.post(
            'https://94he6yatei-3.algolianet.com/1/indexes/steamdb/query',
            {
                'query': '',
                'facetFilters': [['appType:Game']],
                'hitsPerPage': 1,
                'attributesToRetrieve': [
                    'userScore',
                    'oslist'
                ],
                'page': 0,
                'filters': `(objectID:${source.data.id})`
            },
            {
                headers: {
                    'x-algolia-api-key': '9ba0e69fb2974316cdaec8f5f257088f',
                    'x-algolia-application-id': '94HE6YATEI',
                    'Origin': 'https://www.protondb.com'
                }
            }
        );

        if (!hits.length) {
            throw new Error('ProtonDB request did not return any results');
        }

        if (hits[0].oslist.includes('Linux')) {
            return {
                ...source.data,
                score: 'native'
            };
        }

        const { data: { tier } } = await this.axios.get(
            `https://www.protondb.com/api/v1/reports/summaries/${source.data.id}.json`
        );

        return {
            ...source.data,
            score: tier
        };
    }
}
