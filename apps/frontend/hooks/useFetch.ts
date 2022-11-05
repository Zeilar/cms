import useSWR from "swr";
import { ParsedResponse } from "../util/API";

interface Options<T> {
	initialData?: T;
}

export default function useFetch<T>(
	key: unknown,
	callback: () => Promise<ParsedResponse<T>>,
	options?: Options<ParsedResponse<T>>
) {
	const { data, ...rest } = useSWR<ParsedResponse<T>>(JSON.stringify(key), callback, {
		fallbackData: options?.initialData,
	});
	return { data: data?.data, ...rest };
}
