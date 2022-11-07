import { useRouter } from "next/router";

function firstParam(param: string | string[] | undefined): string | undefined {
	return Array.isArray(param) ? param[0] : param;
}

export function useParams<T extends (string | undefined)[]>(...params: string[]): T {
	const { query } = useRouter();
	return params.map(param => {
		const value = query[param];
		return typeof value === "string" ? firstParam(value) : value;
	}) as T;
}
