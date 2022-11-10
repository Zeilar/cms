import useSWR, { Key } from "swr";
import { ParsedResponse } from "../util/API";

interface Options<T> {
	initialData?: T;
}

export default function useFetch<T>(
	key: Key,
	callback: () => Promise<ParsedResponse<T>>,
	options?: Options<ParsedResponse<T>>
) {
	const { data, ...rest } = useSWR<ParsedResponse<T>>(key, callback, {
		fallbackData: options?.initialData,
	});
	return { data: data?.data, ...rest };
}
