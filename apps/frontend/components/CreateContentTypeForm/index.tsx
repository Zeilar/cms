import {
	FormControl,
	FormErrorMessage,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import Col from "../layout/Col";
import { useForm } from "react-hook-form";
import ButtonWithArrow from "../layout/ButtonWithArrow";
import EnhancedFormLabel from "../layout/EnhancedFormLabel";
import { ContentTypeValidation } from "@shared";
import { API } from "apps/frontend/util/API";

interface Props {
	onClose(): void;
	isOpen: boolean;
	spaceName: string;
}

interface Fields {
	name: string;
}

export default function CreateContentTypeForm({ spaceName, ...props }: Props) {
	const { handleSubmit, register, formState } = useForm<Fields>({
		defaultValues: {
			name: "",
		},
	});

	function submit({ name }: Fields) {
		API.fetch("content-type", { method: "POST", data: { name, spaceName } });
	}

	return (
		<Modal {...props}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create Content Type</ModalHeader>
				<ModalCloseButton />
				<ModalBody as="form" onSubmit={handleSubmit(submit)}>
					<FormControl isInvalid={Boolean(formState.errors.name)} mb={4}>
						<EnhancedFormLabel
							id="name"
							heading="Name"
							tooltipLabel={
								<Col>
									<Text>
										Must have minimum {ContentTypeValidation.NAME_MIN_LENGTH}{" "}
										characters
									</Text>
									<Text>
										Must not exceed {ContentTypeValidation.NAME_MAX_LENGTH}{" "}
										characters
									</Text>
								</Col>
							}
						/>
						<Input
							required
							isRequired
							placeholder="Post"
							id="name"
							{...register("name", {
								required: "Name is required",
								minLength: {
									message: `Name must have a minimum of ${ContentTypeValidation.NAME_MIN_LENGTH} characters`,
									value: ContentTypeValidation.NAME_MIN_LENGTH,
								},
								maxLength: {
									message: `Name must not exceed ${ContentTypeValidation.NAME_MAX_LENGTH} characters`,
									value: ContentTypeValidation.NAME_MAX_LENGTH,
								},
							})}
						/>
						{formState.errors.name?.message && (
							<FormErrorMessage>{formState.errors.name.message}</FormErrorMessage>
						)}
					</FormControl>
					<ButtonWithArrow w="full" mt="auto">
						Submit
					</ButtonWithArrow>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
