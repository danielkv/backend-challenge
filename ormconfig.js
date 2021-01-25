module.exports = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [__dirname + '/src/modules/**/*.entity.{ts,js}'],
    migrations: ['./src/migrations/*.{ts,js}'],
    cli: {
        migrationsDir: './src/migrations',
    },
};
