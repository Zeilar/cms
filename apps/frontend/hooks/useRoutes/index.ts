import { useMemo } from "react";
import Routes from "./Routes";

export function useRoutes(spaceName?: string, contentTypeName?: string) {
	return useMemo(() => new Routes(spaceName, contentTypeName), [spaceName, contentTypeName]);
}
