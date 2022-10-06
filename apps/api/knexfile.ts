import "dotenv/config";
import { join } from "path";

type NODE_ENV = "development" | "production" | "testing";

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
		directory: join(__dirname, "src/db/migrations"),
		tableName: "knex_migrations",
	},
	seeds: {
		directory: join(__dirname, "src/db/seeds"),
	},
};

const connections: Record<NODE_ENV, object> = {
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

export default connections[process.env.NODE_ENV as NODE_ENV];
