import "../static/fonts"; // This cannot be imported in the theme sadly, as it crashes when installing Chakra types with their CLI
import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@theme";
import Sidebar from "../components/Sidebar";
import { SWRConfig } from "swr";
import { AuthContextProvider } from "../contexts/AuthContext";
import { Maybe, UserDto } from "@shared";

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
				<AuthContextProvider initialUser={initialUser}>
					<SWRConfig value={{ revalidateOnFocus: false }}>
						<Flex as="main">
							<Sidebar />
							<Component {...pageProps} />
						</Flex>
					</SWRConfig>
				</AuthContextProvider>
			</ChakraProvider>
		</>
	);
}

CustomApp.getInitialProps = async (appContext: AppContext): Promise<Partial<CustomAppProps>> => {
	const appProps = await App.getInitialProps(appContext);
	console.log(appContext.ctx.req?.cookies);
	return { ...appProps, initialUser: null };
};
