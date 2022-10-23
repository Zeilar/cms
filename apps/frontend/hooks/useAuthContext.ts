import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("Auth context mustn't be null");
	}
	return context;
}
