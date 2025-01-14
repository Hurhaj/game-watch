import { parseStructure } from '@game-watch/shared';
import { Configuration, LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import * as dotenv from 'dotenv';
import path from 'path';

import { EnvironmentStructure } from './environment';
import { Migration20211012071707 } from './migrations/Migration20211012071707';
import { Migration20211016065028 } from './migrations/Migration20211016065028';
import { Migration20211016134626 } from './migrations/Migration20211016134626';
import { Migration20211020104117 } from './migrations/Migration20211020104117';
import { Migration20211020112018 } from './migrations/Migration20211020112018';
import { Migration20211023134444 } from './migrations/Migration20211023134444';
import { Migration20211115142225 } from './migrations/Migration20211115142225';
import { Migration20211115142226 } from './migrations/Migration20211115142226';
import { Migration20211115142230 } from './migrations/Migration20211115142230';
import { Migration20211129140628 } from './migrations/Migration20211129140628';
import { Migration20220126072903 } from './migrations/Migration20220126072903';
import { Migration20220227090503 } from './migrations/Migration20220227090503';
import { Migration20220329090503 } from './migrations/Migration20220329090503';
import { Migration20220329090504 } from './migrations/Migration20220329090504';
import { Migration20220329090505 } from './migrations/Migration20220329090505';
import { Migration20220329090506 } from './migrations/Migration20220329090506';
import { Migration20220823134444 } from './migrations/Migration20220823134444';
import { Migration20220906064634 } from './migrations/Migration20220906064634';
import { Migration20220906064635 } from './migrations/Migration20220906064635';
import { Migration20220930064636 } from './migrations/Migration20220930064636';
import { Migration20221006064636 } from './migrations/Migration20221006064636';
import { Migration20221006064637 } from './migrations/Migration20221006064637';
import { Migration20230320071621 } from './migrations/Migration20230320071621';
import { Migration20230407084514 } from './migrations/Migration20230407084514';
import { Migration20230608072430 } from './migrations/Migration20230608072430';
import { Migration20230701122426 } from './migrations/Migration20230701122426';
import { Migration20231006064638 } from './migrations/Migration20231006064638';
import { Migration20231006064639 } from './migrations/Migration20231006064639';
import { Migration20231020064650 } from './migrations/Migration20231020064650';
import { Game } from './models/game-model';
import { InfoSource } from './models/info-source-model';
import { Notification } from './models/notification-model';
import { Tag } from './models/tag-model';
import { User } from './models/user-model';

// If used for cli command
dotenv.config({ path: path.join(process.cwd(), '..', '..', '.env') });

const {
    DATABASE_USER,
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    ENABLE_MIKRO_ORM_DEBUGGING,
} = parseStructure(EnvironmentStructure, process.env);

const config: MikroOrmModuleSyncOptions = {
    entities: [Game, InfoSource, Tag, Notification, User],
    type: 'postgresql' as keyof typeof Configuration.PLATFORMS,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    dbName: DATABASE_NAME,
    host: DATABASE_HOST,
    debug: ENABLE_MIKRO_ORM_DEBUGGING,
    highlighter: ENABLE_MIKRO_ORM_DEBUGGING ? new SqlHighlighter() : undefined,
    port: DATABASE_PORT,
    loadStrategy: LoadStrategy.JOINED,
    migrations: {
        path: './src/migrations',
        migrationsList: [
            { name: 'Migration20211012071707.ts', class: Migration20211012071707 },
            { name: 'Migration20211016065028.ts', class: Migration20211016065028 },
            { name: 'Migration20211016134626.ts', class: Migration20211016134626 },
            { name: 'Migration20211020104117.ts', class: Migration20211020104117 },
            { name: 'Migration20211020112018.ts', class: Migration20211020112018 },
            { name: 'Migration20211023134444.ts', class: Migration20211023134444 },
            { name: 'Migration20211115142225.ts', class: Migration20211115142225 },
            { name: 'Migration20211129140628.ts', class: Migration20211129140628 },
            { name: 'Migration20211115142226.ts', class: Migration20211115142226 },
            { name: 'Migration20211115142230.ts', class: Migration20211115142230 },
            { name: 'Migration20220126072903.ts', class: Migration20220126072903 },
            { name: 'Migration20220227090503.ts', class: Migration20220227090503 },
            { name: 'Migration20220329090503.ts', class: Migration20220329090503 },
            { name: 'Migration20220329090504.ts', class: Migration20220329090504 },
            { name: 'Migration20220329090505.ts', class: Migration20220329090505 },
            { name: 'Migration20220329090506.ts', class: Migration20220329090506 },
            { name: 'Migration20220823134444.ts', class: Migration20220823134444 },
            { name: 'Migration20220906064634.ts', class: Migration20220906064634 },
            { name: 'Migration20220906064635.ts', class: Migration20220906064635 },
            { name: 'Migration20220930064636.ts', class: Migration20220930064636 },
            { name: 'Migration20221006064636.ts', class: Migration20221006064636 },
            { name: 'Migration20221006064637.ts', class: Migration20221006064637 },
            { name: 'Migration20231006064638.ts', class: Migration20231006064638 },
            { name: 'Migration20231006064639.ts', class: Migration20231006064639 },
            { name: 'Migration20230320071621.ts', class: Migration20230320071621 },
            { name: 'Migration20230407084514.ts', class: Migration20230407084514 },
            { name: 'Migration20230608072430.ts', class: Migration20230608072430 },
            { name: 'Migration20230701122426.ts', class: Migration20230701122426 },
            { name: 'Migration20231020064650.ts', class: Migration20231020064650 },
        ]
    }
};

export default config;
