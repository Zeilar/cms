import {
	AbsoluteCenter,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Icon,
	Input,
	Text,
	Tooltip,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import Col from "../layout/Col";
import { ReactComponent as Logo } from "../../assets/svgs/black-hole.svg";
import { useForm } from "react-hook-form";
import useAuthContext from "apps/frontend/hooks/useAuthContext";
import GradientBox from "../layout/GradientBox";
import ButtonWithArrow from "../layout/ButtonWthArrow";

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
		<AbsoluteCenter as={Col} alignItems="center" gap={4} maxW="100%" p={4}>
			<Icon w={100} h="fit-content" as={Logo} />
			<GradientBox>
				<Col
					as="form"
					w={450}
					p={8}
					rounded="md"
					borderWidth={2}
					borderColor="border"
					onSubmit={handleSubmit(login)}
				>
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
						<FormLabel htmlFor="password" display="flex" alignItems="center">
							<Heading size="sm">Password</Heading>
							<Tooltip
								bgColor="gray.400"
								color="inherit"
								mb={1}
								hasArrow
								placement="top"
								label={
									<Col>
										<Text>&#8226; Minimum 3 characters</Text>
										<Text>&#8226; Maximum 30 characters</Text>
									</Col>
								}
							>
								<Icon
									as={QuestionOutlineIcon}
									ml={2}
									sx={{ "> g": { strokeWidth: 2 } }}
								/>
							</Tooltip>
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
					<ButtonWithArrow>Sign in</ButtonWithArrow>
				</Col>
			</GradientBox>
		</AbsoluteCenter>
	);
}
