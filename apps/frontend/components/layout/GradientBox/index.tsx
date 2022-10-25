import { FlexProps } from "@chakra-ui/react";
import Col from "../Col";

export default function GradientBox(props: FlexProps) {
	return <Col boxShadow="md" bgGradient="linear(to-t, gray.700, gray.600)" {...props} />;
}
