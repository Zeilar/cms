import {
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	PinInput,
	PinInputField,
	Text,
} from "@chakra-ui/react";
import Col from "../../layout/Col";
import { Controller, useForm } from "react-hook-form";
import useAuthContext from "apps/frontend/hooks/useAuthContext";
import ButtonWithArrow from "../../layout/ButtonWthArrow";
import { RegisterDto, REGISTER_TOKEN_LENGTH, Validation } from "@shared";
import EnhancedFormLabel from "../../layout/EnhancedFormLabel";
import { test } from "base58-random";

interface Fields extends RegisterDto {
	passwordConfirm: string;
}

export default function RegisterForm() {
	const auth = useAuthContext();
	const { handleSubmit, register, formState, watch, control } = useForm<Fields>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirm: "",
			token: "",
		},
	});

	const passwordInput = watch("password");

	function submit({ passwordConfirm, ...credentials }: Fields) {
		auth.register(credentials);
	}

	return (
		<Col as="form" onSubmit={handleSubmit(submit)}>
			<FormControl isInvalid={Boolean(formState.errors.email)} mb={4}>
				<EnhancedFormLabel
					id="registerEmail"
					heading="Email"
					tooltipLabel={`Must not exceed ${Validation.EMAIL_MAX_LENGTH} characters`}
				/>
				<Input
					autoComplete="off"
					required
					isRequired
					type="email"
					placeholder="john.smith@gmail.com"
					id="registerEmail"
					{...register("email", {
						required: "Email is required",
						maxLength: {
							message: `Email must not exceed ${Validation.EMAIL_MAX_LENGTH} characters`,
							value: Validation.EMAIL_MAX_LENGTH,
						},
					})}
				/>
				{formState.errors.email?.message && (
					<FormErrorMessage>{formState.errors.email.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={Boolean(formState.errors.name)} mb={4}>
				<EnhancedFormLabel
					id="name"
					heading="Name"
					tooltipLabel={
						<Col>
							<Text>Must have minimum {Validation.NAME_MIN_LENGTH} characters</Text>
							<Text>Must not exceed {Validation.NAME_MAX_LENGTH} characters</Text>
						</Col>
					}
				/>
				<Input
					autoComplete="off"
					required
					isRequired
					placeholder="John"
					id="name"
					{...register("name", {
						required: "Name is required",
						minLength: {
							message: `Name must have a minimum of ${Validation.NAME_MIN_LENGTH} characters`,
							value: Validation.NAME_MIN_LENGTH,
						},
						maxLength: {
							message: `Name must not exceed ${Validation.NAME_MAX_LENGTH} characters`,
							value: Validation.NAME_MAX_LENGTH,
						},
					})}
				/>
				{formState.errors.name?.message && (
					<FormErrorMessage>{formState.errors.name.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={Boolean(formState.errors.password)} mb={4}>
				<EnhancedFormLabel
					id="registerPassword"
					heading="Password"
					tooltipLabel={
						<Col>
							<Text>
								Must have minimum {Validation.PASSWORD_MIN_LENGTH} characters
							</Text>
							<Text>Must not exceed {Validation.PASSWORD_MAX_LENGTH} characters</Text>
						</Col>
					}
				/>
				<Input
					autoComplete="off"
					required
					isRequired
					type="password"
					placeholder="••••••••••"
					id="registerPassword"
					{...register("password", {
						required: "Password is required",
						minLength: {
							message: `Password must have a minimum of ${Validation.PASSWORD_MIN_LENGTH} characters`,
							value: Validation.PASSWORD_MIN_LENGTH,
						},
						maxLength: {
							message: `Password must not exceed ${Validation.PASSWORD_MAX_LENGTH} characters`,
							value: Validation.NAME_MAX_LENGTH,
						},
					})}
				/>
				{formState.errors.password?.message && (
					<FormErrorMessage>{formState.errors.password.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl isInvalid={Boolean(formState.errors.passwordConfirm)} mb={4}>
				<EnhancedFormLabel
					id="passwordConfirm"
					heading="Confirm Password"
					tooltipLabel="Must match password"
				/>
				<Input
					autoComplete="off"
					required
					isRequired
					type="password"
					placeholder="••••••••••"
					id="passwordConfirm"
					{...register("passwordConfirm", {
						required: "Password confirmation is required",
						validate: value =>
							value === passwordInput ? true : "Passwords do not match",
					})}
				/>
				{formState.errors.passwordConfirm?.message && (
					<FormErrorMessage>{formState.errors.passwordConfirm.message}</FormErrorMessage>
				)}
			</FormControl>
			<FormControl as={Col} isInvalid={Boolean(formState.errors.token)} mb={4}>
				<EnhancedFormLabel
					heading="Register token"
					id="token"
					tooltipLabel="This token was sent to a specified email address. Check your inbox."
				/>
				<Flex justify="space-between" mt={2} pos="relative">
					<Controller
						key="tts"
						control={control}
						name="token"
						rules={{
							minLength: {
								message: `Token must contain exactly ${REGISTER_TOKEN_LENGTH} characters`,
								value: REGISTER_TOKEN_LENGTH,
							},
							validate: value => {
								return test(value)
									? true
									: "Token format is invalid. It may only contain alphanumeric characters.";
							},
						}}
						render={({ field: { onChange } }) => (
							<PinInput
								placeholder=""
								onChange={onChange}
								id="token"
								size="lg"
								type="alphanumeric"
								isDisabled={formState.isSubmitting}
								otp
							>
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
								<PinInputField />
							</PinInput>
						)}
					/>
				</Flex>
				{formState.errors.token?.message && (
					<FormErrorMessage>{formState.errors.token.message}</FormErrorMessage>
				)}
			</FormControl>
			<ButtonWithArrow>Create account</ButtonWithArrow>
		</Col>
	);
}
