import convict from 'convict'

type Environment = 'development' | 'test' | 'production';

const config = convict({
    env: {
        format: ['development', 'test', 'production'],
        default: 'development',
        env: 'NODE_ENV'
    },
    db: {
        host: {
            format: String,
            default: '127.0.0.1',
            env: 'DB_HOST'
        },
        port: {
            format: 'port',
            default: 5432,
            env: 'DB_PORT'
        },
        adminUser: {
            name: {
                format: String,
                default: 'postgres',
                env: 'DB_ADMIN_NAME'
            },
            pass: {
                format: String,
                default: 'password',
                env: 'DB_ADMIN_PASS'
            },
        },
        regularUser: {
            name: {
                format: String,
                default: 'postgraphile_next_starter_user',
                env: 'DB_USER_NAME'
            },
            pass: {
                format: String,
                default: 'password',
                env: 'DB_USER_PASS'
            },
        },
        name: {
            format: String,
            default: 'postgraphile_next_starter',
            env: 'DB_NAME'
        }
    }
})

const env = (config.get('env') as Environment);
config.validate({ allowed: 'strict' })

export default {
    env: config.get('env') as Environment,
    db: (db => ({
        ...db,
        url: (opt: { admin?: boolean } = { admin: false }) => `postgres://${opt.admin ? db.adminUser.name : db.regularUser.name}:${opt.admin ? db.adminUser.pass : db.regularUser.pass}@${db.host}:${db.port}/${db.name}`,
    }))(config.get('db'))
};