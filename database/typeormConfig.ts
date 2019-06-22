import globalConfig from "./globalConfig";
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormconfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: globalConfig.db.host,
    port: globalConfig.db.port,
    username: globalConfig.db.adminUser.name,
    password: globalConfig.db.adminUser.pass,
    database: globalConfig.db.name,
    schema: "typeorm",
    logging: true,
    migrationsRun: false,
    entities: [
        "entities/**/*"
    ],
    migrations: [
        "migrations/**/*"
    ]
}

console.log(ormconfig)

module.exports = ormconfig;