import {
	AbsoluteCenter,
	Flex,
	FormControl,
	FormErrorMessage,
	PinInput,
	PinInputField,
	Spinner,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import ButtonWithArrow from "../../layout/ButtonWthArrow";
import Col from "../../layout/Col";
import EnhancedFormLabel from "../../layout/EnhancedFormLabel";

interface TokenFields {
	token: string;
}

const TOKEN_LENGTH = 6;

export default function TokenForm() {
	const { control, formState, handleSubmit, setError } = useForm<TokenFields>({
		defaultValues: { token: "" },
		mode: "all",
	});

	function submit({ token }: TokenFields) {
		if (token.length < TOKEN_LENGTH) {
			setError("token", { message: "Please fill out all the boxes", type: "minLength" });
			return;
		}
		console.log("submit", token);
	}

	return (
		<Col as="form" onSubmit={handleSubmit(submit)}>
			<FormControl as={Col} isInvalid={Boolean(formState.errors.token)}>
				<EnhancedFormLabel
					heading="Register token"
					id="token"
					tooltipLabel="This token is used to register a new account, one-time only."
				/>
				<Flex justify="space-between" mt={2} pos="relative">
					{formState.isSubmitting && (
						<AbsoluteCenter zIndex={5} pointerEvents="none">
							<Spinner />
						</AbsoluteCenter>
					)}
					<Controller
						key="tts"
						control={control}
						name="token"
						render={({ field: { onChange } }) => (
							<PinInput
								placeholder=""
								onChange={onChange}
								id="token"
								size="xl"
								type="alphanumeric"
								isDisabled={formState.isSubmitting}
								otp
								onComplete={() => handleSubmit(submit)}
							>
								{Array.from({ length: TOKEN_LENGTH }).map((_, i) => (
									<PinInputField key={i} />
								))}
							</PinInput>
						)}
					/>
				</Flex>
				{formState.errors.token?.message && (
					<FormErrorMessage>{formState.errors.token.message}</FormErrorMessage>
				)}
			</FormControl>
			<ButtonWithArrow>Validate</ButtonWithArrow>
		</Col>
	);
}
