import {
	AbsoluteCenter,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Icon,
	Input,
} from "@chakra-ui/react";
import Col from "../layout/Col";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import { useForm } from "react-hook-form";
import useAuthContext from "apps/frontend/hooks/useAuthContext";
import GradientBox from "../layout/GradientBox";

interface Fields {
	email: string;
	password: string;
}

export default function Login() {
	const { login } = useAuthContext();
	const { handleSubmit, register, formState } = useForm<Fields>({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<AbsoluteCenter as={Col} alignItems="center" gap={8} maxW="100%" p={4}>
			<Icon w={300} h="fit-content" as={Logo} />
			<GradientBox>
				<Col
					as="form"
					w={400}
					px={8}
					py={12}
					rounded="md"
					borderWidth={2}
					borderColor="border"
					onSubmit={handleSubmit(login)}
				>
					<Heading textAlign="center" mb={8} color="accent.main">
						Login
					</Heading>
					<FormControl isInvalid={Boolean(formState.errors.email)} mb={4}>
						<FormLabel htmlFor="email">
							<Heading size="sm">Email</Heading>
						</FormLabel>
						<Input
							required
							isRequired
							variant="filled"
							placeholder="John"
							id="email"
							{...register("email", { required: "Email is required" })}
						/>
						{formState.errors.email?.message && (
							<FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={Boolean(formState.errors.password)} mb={4}>
						<FormLabel htmlFor="password">
							<Heading size="sm">Password</Heading>
						</FormLabel>
						<Input
							required
							isRequired
							variant="filled"
							placeholder="••••••••••"
							id="password"
							{...register("password", { required: "Password is required" })}
						/>
						{formState.errors.password?.message && (
							<FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>
						)}
					</FormControl>
					<Button size="md" variant="outline" type="submit" mt={4}>
						Submit
					</Button>
				</Col>
			</GradientBox>
		</AbsoluteCenter>
	);
}
