import { createContext, useCallback, useState } from "react";
import { UserDto, Maybe, LoginDto, RegisterDto, FirstRegisterDto } from "@shared";
import { API } from "../util/API";

interface IAuthContext {
	isAuthenticated: boolean;
	user: Maybe<UserDto>;
	firstTimeRegister(credentials: FirstRegisterDto): Promise<void>;
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

	const login = useCallback(async (credentials: LoginDto) => {
		const { data, ok } = await API.fetch<UserDto>("auth/login", {
			method: "POST",
			data: credentials,
		});
		if (!ok || !data) {
			return;
		}
		setUser(data);
	}, []);

	const firstTimeRegister = useCallback(
		async (credentials: FirstRegisterDto): Promise<void> => {
			const { ok } = await API.fetch<UserDto>("auth/first-time-register", {
				method: "POST",
				data: credentials,
			});
			if (!ok) {
				return;
			}
			login({ email: credentials.email, password: credentials.password });
		},
		[login]
	);

	const register = useCallback(
		async (credentials: RegisterDto): Promise<void> => {
			const { ok } = await API.fetch<UserDto>("auth/register", {
				method: "POST",
				data: credentials,
			});
			if (!ok) {
				return;
			}
			login({ email: credentials.email, password: credentials.password });
		},
		[login]
	);

	const logout = useCallback(async (): Promise<void> => {
		const { ok } = await API.fetch("auth/logout", { method: "POST" });
		if (!ok) {
			return;
		}
		setUser(null);
	}, []);

	const values: IAuthContext = {
		isAuthenticated: user !== null,
		firstTimeRegister,
		register,
		login,
		logout,
		user,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
