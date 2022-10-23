/* eslint-disable */

import type { NODE_ENV } from "./env";
import express = require("express");
import { User } from "../features/user/user.model";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: NODE_ENV;
			PORT: string;
			CORS_ORIGIN: string;
			SESSION_SECRET: string;
			DB_TYPE: string;
			DB_HOST: string;
			DB_PORT: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_NAME: string;
			REDIS_HOST: string;
			REDIS_PORT: string;
			REDIS_PASSWORD: string;
		}
	}
	namespace Express {
		interface Request {
			user: User;
		}
	}
}
