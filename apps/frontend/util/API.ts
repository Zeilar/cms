type HttpVerb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
	data?: unknown;
	method?: HttpVerb;
	cookie?: string;
}

const DEFAULT_FETCH_OPTIONS: FetchOptions = {
	method: "GET",
};

const { NX_API_URL } = process.env;

export class API {
	private static baseUrl = NX_API_URL;

	public static async fetch<T>(
		url: string,
		{ method, data, cookie }: FetchOptions = DEFAULT_FETCH_OPTIONS
	) {
		const response = await fetch(`${this.baseUrl}/${url}`, {
			// @ts-expect-error cookie is a valid header
			headers: {
				"Content-Type": "application/json",
				cookie,
			},
			credentials: "include",
			body: JSON.stringify(data),
			method,
		});
		const json: T = await response.json();
		return {
			data: json,
			status: response.status,
		};
	}
}