import "../static/fonts"; // This cannot be imported in the theme sadly, as it crashes when installing Chakra types with their CLI
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@theme";
import Sidebar from "../components/Sidebar";
import { SWRConfig } from "swr";
import { AuthContextProvider } from "../contexts/AuthContext";
import { Maybe, UserDto } from "@shared";
import { API } from "../util/API";
import useAuthContext from "../hooks/useAuthContext";
import Login from "../components/Login";

interface AppContainerProps {
	children: React.ReactNode;
}

function AppContainer({ children }: AppContainerProps) {
	const { isAuthenticated } = useAuthContext();
	return isAuthenticated ? children : <Login />;
}

interface CustomAppProps extends AppProps {
	initialUser: Maybe<UserDto>;
}

export default function CustomApp({ Component, pageProps, initialUser }: CustomAppProps) {
	return (
		<>
			<Head>
				<title>CMSpacey</title>
			</Head>
			<ChakraProvider theme={theme}>
				<SWRConfig value={{ revalidateOnFocus: false }}>
					<AuthContextProvider initialUser={initialUser}>
						<Flex as="main">
							<AppContainer>
								<Sidebar />
								<Component {...pageProps} />
							</AppContainer>
						</Flex>
					</AuthContextProvider>
				</SWRConfig>
			</ChakraProvider>
		</>
	);
}

CustomApp.getInitialProps = async (appContext: AppContext): Promise<Partial<CustomAppProps>> => {
	const appProps = await App.getInitialProps(appContext);
	const cookie = appContext.ctx.req?.headers["cookie"];
	let initialUser: Maybe<UserDto> = null;

	if (cookie === undefined) {
		return {
			...appProps,
			initialUser,
		};
	}

	const { data, status } = await API.fetch<UserDto>("auth", {
		cookie,
	});

	if (status === 200) {
		initialUser = data;
	}

	return { ...appProps, initialUser };
};
