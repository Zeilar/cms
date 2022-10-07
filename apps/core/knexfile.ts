/* eslint-disable */

require("ts-node/register");
require("dotenv").config();
const join = require("path").join;

const defaults = {
	client: process.env.DB_TYPE,
	connection: {
		port: parseInt(process.env.DB_PORT as string),
		host: process.env.DB_HOST,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	migrations: {
		directory: join(__dirname, "src/core/db/migrations"),
		tableName: "knex_migrations",
	},
	seeds: {
		directory: join(__dirname, "src/core/db/seeds"),
	},
};

const connections: Record<string, object> = {
	development: {
		...defaults,
		debug: true,
	},
	testing: {
		...defaults,
		debug: true,
	},
	production: {
		...defaults,
		debug: false,
	},
};

module.exports = connections[process.env.NODE_ENV as unknown as string];
