import {
	AbsoluteCenter,
	Box,
	Divider,
	Flex,
	FlexProps,
	Heading,
	Icon,
	Portal,
} from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/svgs/black-hole.svg";
import GradientBox from "../layout/GradientBox";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Col from "../layout/Col";
import useSWR from "swr";
import { API } from "apps/frontend/util/API";
import Spinner from "../Spinner";
import FirstTimeRegisterForm from "./FirstTimeRegister";
import { BRAND_NAME } from "@shared";

interface FormBoxProps extends FlexProps {
	children: React.ReactNode;
}

function FormBox({ children, ...props }: FormBoxProps) {
	return (
		<GradientBox w={450} p={8} {...props}>
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

function isFirstUserCreatedFetcher() {
	return API.fetch<boolean>("users/is-first-user-created");
}

export default function Login() {
	const { data, isValidating } = useSWR("isFirstUserCreated", isFirstUserCreatedFetcher);
	if (isValidating) {
		return (
			<AbsoluteCenter>
				<Spinner />
			</AbsoluteCenter>
		);
	}
	return (
		<Flex as={AbsoluteCenter} align="center" maxW="100%" p={4}>
			{data?.data === true ? (
				<>
					<Portal>
						<Box
							pos="fixed"
							w="50%"
							bgGradient="linear(to-t, gray.700, gray.600)"
							inset={0}
							zIndex={-1}
						/>
					</Portal>
					<FormBox bgGradient="linear(to-t, gray.800, gray.700)">
						<LoginForm />
					</FormBox>
					<Col align="center" justify="center" my="auto" mx={4} gap={4}>
						<CustomDivider />
						<Icon w={100} h="fit-content" as={Logo} />
						<CustomDivider />
					</Col>
					<FormBox>
						<RegisterForm />
					</FormBox>
				</>
			) : (
				<Col align="center">
					<Heading textAlign="center" mb={4}>
						Welcome to {BRAND_NAME}
					</Heading>
					<Heading textAlign="center" mb={8} size="md">
						Create an account to start creating content
					</Heading>
					<FormBox as="fieldset">
						<GradientBox
							as="legend"
							justify="center"
							align="center"
							mx="auto"
							rounded="100%"
							px={1}
							w={65}
							h={65}
							borderWidth={2}
							borderColor="border"
						>
							<Icon w={50} h="fit-content" as={Logo} />
						</GradientBox>
						<FirstTimeRegisterForm />
					</FormBox>
				</Col>
			)}
		</Flex>
	);
}
