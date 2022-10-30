import { AbsoluteCenter, Box, Divider, Flex, Icon, Portal } from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/svgs/black-hole.svg";
import GradientBox from "../layout/GradientBox";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Col from "../layout/Col";

interface FormBoxProps {
	children: React.ReactNode;
}

function FormBox({ children }: FormBoxProps) {
	return (
		<GradientBox
			w={450}
			p={8}
			rounded="md"
			borderWidth={2}
			borderColor="border"
			_first={{ bgGradient: "linear(to-t, gray.800, gray.700)" }}
		>
			{children}
		</GradientBox>
	);
}

function CustomDivider() {
	return (
		<Divider
			orientation="vertical"
			h={5}
			w={1}
			border={0}
			bgColor="accent.main"
			rounded="full"
		/>
	);
}

export default function Login() {
	return (
		<Flex as={AbsoluteCenter} align="center" maxW="100%" p={4}>
			<Portal>
				<Box pos="fixed" w="50%" bgColor="gray.700" inset={0} zIndex={-1} />
			</Portal>
			<FormBox>
				<LoginForm />
			</FormBox>
			<Col align="center" justify="center" my="auto" mx={4}>
				<CustomDivider />
				<Icon my={4} w={100} h="fit-content" as={Logo} />
				<CustomDivider />
			</Col>
			<FormBox>
				<RegisterForm />
			</FormBox>
		</Flex>
	);
}
