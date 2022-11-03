import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import Col from "../../layout/Col";
import { useForm } from "react-hook-form";
import useAuthContext from "apps/frontend/hooks/useAuthContext";
import ButtonWithArrow from "../../layout/ButtonWithArrow";
import { LoginDto } from "@shared";

export default function LoginForm() {
	const { login } = useAuthContext();
	const { handleSubmit, register, formState } = useForm<LoginDto>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<Col as="form" onSubmit={handleSubmit(login)} grow={1}>
			<FormControl isInvalid={Boolean(formState.errors.email)} mb={4}>
				<FormLabel htmlFor="loginEmail">
					<Heading size="sm">Email</Heading>
				</FormLabel>
				<Input
					required
					isRequired
					type="email"
					placeholder="John"
					id="loginEmail"
					{...register("email", { required: "Email is required" })}
				/>
				{formState.errors.email?.message && (
					<FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={Boolean(formState.errors.password)} mb={4}>
				<FormLabel htmlFor="loginPassword">
					<Heading size="sm">Password</Heading>
				</FormLabel>
				<Input
					required
					isRequired
					type="password"
					placeholder="••••••••••"
					id="loginPassword"
					{...register("password", { required: "Password is required" })}
				/>
				{formState.errors.password?.message && (
					<FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>
				)}
			</FormControl>
			<Flex align="center" justify="space-between" mt={4} mb={8}>
				<Flex gap={2}>
					<Checkbox id="rememberMe" />
					<FormLabel fontWeight={600} mb={0} htmlFor="rememberMe">
						<Heading size="sm">Remember me</Heading>
					</FormLabel>
				</Flex>
				<Button variant="link">Forgot password?</Button>
			</Flex>
			<ButtonWithArrow mt="auto">Sign in</ButtonWithArrow>
		</Col>
	);
}
