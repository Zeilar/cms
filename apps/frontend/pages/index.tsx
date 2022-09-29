import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

export default function Index() {
	return (
		<Flex>
			<Sidebar />
			<Text>Hello world</Text>
		</Flex>
	);
}
