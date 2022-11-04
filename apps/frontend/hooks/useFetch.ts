import useSWR from "swr";
import { ParsedResponse } from "../util/API";

export default function useFetch<T>(key: unknown, callback: () => Promise<ParsedResponse<T>>) {
	const { data, ...rest } = useSWR<ParsedResponse<T>>(JSON.stringify(key), callback);
	return { data: data?.data, ...rest };
}
