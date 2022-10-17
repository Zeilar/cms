import "../static/fonts"; // This cannot be imported in the theme sadly, as it crashes when installing Chakra types with their CLI
import { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "@theme";
import Sidebar from "../components/Sidebar";
import { SWRConfig } from "swr";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>CMSpacey</title>
			</Head>
			<ChakraProvider theme={theme}>
				<SWRConfig value={{ revalidateOnFocus: false }}>
					<Flex as="main">
						<Sidebar />
						<Component {...pageProps} />
					</Flex>
				</SWRConfig>
			</ChakraProvider>
		</>
	);
}

export default CustomApp;
