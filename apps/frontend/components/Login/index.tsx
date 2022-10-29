import { AbsoluteCenter, Flex, Icon, PinInput, PinInputField } from "@chakra-ui/react";
import { ReactComponent as Logo } from "../../assets/svgs/black-hole.svg";
import GradientBox from "../layout/GradientBox";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Col from "../layout/Col";
import DividerWithText from "../layout/DividerWithText";
import { useState } from "react";
import TokenForm from "./TokenForm";

interface FormBoxProps {
	children: React.ReactNode;
}

function FormBox({ children }: FormBoxProps) {
	return (
		<GradientBox w={450} p={8} rounded="md" borderWidth={2} borderColor="border">
			{children}
		</GradientBox>
	);
}

export default function Login() {
	const [isRegisterFormActive, setIsRegisterFormActive] = useState(false);
	return (
		<AbsoluteCenter as={Col} align="center" gap={4} maxW="100%" p={4}>
			<Icon w={100} h="fit-content" as={Logo} />
			<FormBox>
				<LoginForm />
				<DividerWithText text="OR" />
				<TokenForm />
			</FormBox>
			{/* <FormBox>
                {isRegisterFormActive ? (
                    <RegisterForm />
                ) : (
                    <LoginForm />
                )}
			</FormBox> */}
		</AbsoluteCenter>
	);
}
