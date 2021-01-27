const rootPath = process.env.NODE_ENV === 'production' ? '/build' : '';

module.exports = {
    name: 'default',
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [__dirname + '/**/modules/**/*.entity.{ts,js}'],
    migrations: [`.${rootPath}/src/migrations/*.{ts,js}`],
    cli: {
        migrationsDir: './src/migrations',
    },

    logging: !['test', 'production'].includes(process.env.NODE_ENV),
};
