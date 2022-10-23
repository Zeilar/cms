import { createContext, useState } from "react";
import { UserDto, Maybe } from "@shared";
import { API } from "../util/API";

interface Credentials {
	email: string;
	password: string;
}

interface IAuthContext {
	user: Maybe<UserDto>;
	login(credentials: Credentials): Promise<void>;
	logout(): Promise<void>;
}

interface AuthProps {
	children: React.ReactNode;
	initialUser: Maybe<UserDto>;
}

export const AuthContext = createContext<Maybe<IAuthContext>>(null);

export function AuthContextProvider({ children }: AuthProps) {
	const [user, setUser] = useState<IAuthContext["user"]>(null);

	async function login(credentials: Credentials): Promise<void> {
		const { data, status } = await API.fetch<UserDto>("auth/login", {
			method: "POST",
			data: credentials,
		});
		if (status !== 200) {
			return;
		}
		setUser(data);
	}

	async function logout(): Promise<void> {
		const { status } = await API.fetch("auth/logout", { method: "POST" });
		if (status !== 200) {
			return;
		}
		setUser(null);
	}

	const values: IAuthContext = {
		login,
		logout,
		user,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
