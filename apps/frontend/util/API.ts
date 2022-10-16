const { NX_API_URL } = process.env;

export class API {
	private static baseUrl = NX_API_URL;

	public static async fetch<T>(url: string, init?: RequestInit) {
		const response = await fetch(`${this.baseUrl}/${url}`, init);
		return response.json() as unknown as T;
	}
}
