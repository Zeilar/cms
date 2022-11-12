import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("Auth context must not be null");
	}
	return context;
}
