import { createContext, useCallback, useState } from "react";
import { UserDto, Maybe, LoginDto, RegisterDto } from "@shared";
import { API } from "../util/API";

interface IAuthContext {
	isAuthenticated: boolean;
	user: Maybe<UserDto>;
	register(credentials: RegisterDto): Promise<void>;
	login(credentials: LoginDto): Promise<void>;
	logout(): Promise<void>;
}

interface AuthProps {
	children: React.ReactNode;
	initialUser: Maybe<UserDto>;
}

export const AuthContext = createContext<Maybe<IAuthContext>>(null);

export function AuthContextProvider({ children, initialUser }: AuthProps) {
	const [user, setUser] = useState<IAuthContext["user"]>(initialUser);

	const register = useCallback(async (credentials: RegisterDto): Promise<void> => {
		const { data, status } = await API.fetch<UserDto>("auth/register", {
			method: "POST",
			data: credentials,
		});
		if (status !== 200) {
			return;
		}
		setUser(data);
	}, []);

	const login = useCallback(async (credentials: LoginDto) => {
		const { data, status } = await API.fetch<UserDto>("auth/login", {
			method: "POST",
			data: credentials,
		});
		if (status !== 200) {
			return;
		}
		setUser(data);
	}, []);

	const logout = useCallback(async (): Promise<void> => {
		const { status } = await API.fetch("auth/logout", { method: "POST" });
		if (status !== 200) {
			return;
		}
		setUser(null);
	}, []);

	const values: IAuthContext = {
		isAuthenticated: user !== null,
		register,
		login,
		logout,
		user,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
