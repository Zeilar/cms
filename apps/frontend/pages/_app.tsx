import { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@theme";
import "../static/fonts"; // This cannot be imported in the theme sadly, as it crashes when installing Chakra types with their CLI
import Sidebar from "../components/Sidebar";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>CMSpacey</title>
			</Head>
			<main>
				<ChakraProvider theme={theme}>
					<Sidebar />
					<Component {...pageProps} />
				</ChakraProvider>
			</main>
		</>
	);
}

export default CustomApp;
