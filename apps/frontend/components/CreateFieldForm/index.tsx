import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Grid,
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
import { Controller, useForm } from "react-hook-form";
import ButtonWithArrow from "../layout/ButtonWithArrow";
import EnhancedFormLabel from "../layout/EnhancedFormLabel";
import { Callback, FieldValidation, CreateFieldDto, FieldType } from "@shared";
import { API } from "apps/frontend/util/API";
import FieldTypeBox from "./FieldTypeBox";
import { Switch } from "@styled-icons/entypo/Switch";
import { Text as TextIcon } from "@styled-icons/evaicons-solid/Text";
import { BodyText, Braces } from "@styled-icons/bootstrap";
import { Calendar } from "@styled-icons/boxicons-solid/Calendar";
import { Number } from "@styled-icons/octicons/Number";
import { MapLocationDot } from "@styled-icons/fa-solid/MapLocationDot";

interface Props {
	onClose: Callback;
	onSubmit: Callback;
	isOpen: boolean;
	contentTypeName: string;
}

interface Fields {
	name: string;
	type: FieldType | null;
}

export default function CreateFieldForm({ contentTypeName, onSubmit, isOpen, onClose }: Props) {
	const { handleSubmit, register, formState, reset, control } = useForm<Fields>({
		defaultValues: {
			name: "",
			type: null,
		},
		mode: "onSubmit",
	});

	async function submit({ name, type }: Fields): Promise<void> {
		const { ok } = await API.fetch("field", {
			method: "POST",
			data: { name, contentTypeName, type } as CreateFieldDto,
		});
		if (!ok) {
			return;
		}
		onClose();
		reset();
		onSubmit();
	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent display="flex" w={700} maxW="unset">
				<ModalHeader>Create Field</ModalHeader>
				<ModalCloseButton />
				<ModalBody as="form" onSubmit={handleSubmit(submit)}>
					<FormControl isInvalid={Boolean(formState.errors.name)} mb={4}>
						<EnhancedFormLabel
							id="name"
							heading="Name"
							tooltipLabel={
								<Col>
									<Text>
										Must have minimum {FieldValidation.NAME_MIN_LENGTH}{" "}
										characters
									</Text>
									<Text>
										Must not exceed {FieldValidation.NAME_MAX_LENGTH} characters
									</Text>
								</Col>
							}
						/>
						<Input
							required
							isRequired
							disabled={formState.isSubmitting}
							placeholder="Post"
							id="name"
							{...register("name", {
								required: "Name is required",
								minLength: {
									message: `Name must have a minimum of ${FieldValidation.NAME_MIN_LENGTH} characters`,
									value: FieldValidation.NAME_MIN_LENGTH,
								},
								maxLength: {
									message: `Name must not exceed ${FieldValidation.NAME_MAX_LENGTH} characters`,
									value: FieldValidation.NAME_MAX_LENGTH,
								},
							})}
						/>
						{formState.errors.name?.message && (
							<FormErrorMessage>{formState.errors.name.message}</FormErrorMessage>
						)}
					</FormControl>
					<FormControl isInvalid={Boolean(formState.errors.type)} mb={8}>
						<FormLabel>Type</FormLabel>
						<Controller
							rules={{ required: "Type is required." }}
							control={control}
							name="type"
							render={({ field }) => (
								<Grid templateColumns="repeat(3, 1fr)" gap={2}>
									<FieldTypeBox
										active={field.value === FieldType.TEXT}
										fieldType={FieldType.TEXT}
										description="Titles, names, paragraphs"
										onSelect={field.onChange}
										label="Text"
										disabled={formState.isSubmitting}
										icon={TextIcon}
									/>
									<FieldTypeBox
										active={field.value === FieldType.RICH_TEXT}
										fieldType={FieldType.RICH_TEXT}
										description="Advanced text format"
										onSelect={field.onChange}
										label="Rich Text"
										disabled={formState.isSubmitting}
										icon={BodyText}
									/>
									<FieldTypeBox
										active={field.value === FieldType.BOOLEAN}
										fieldType={FieldType.BOOLEAN}
										description="True or false"
										onSelect={field.onChange}
										label="Boolean"
										disabled={formState.isSubmitting}
										icon={Switch}
									/>
									<FieldTypeBox
										active={field.value === FieldType.DATE}
										fieldType={FieldType.DATE}
										description="Date or time"
										onSelect={field.onChange}
										label="Date"
										disabled={formState.isSubmitting}
										icon={Calendar}
									/>
									<FieldTypeBox
										active={field.value === FieldType.INTEGER}
										fieldType={FieldType.INTEGER}
										description="Numbers, integers, decimals"
										onSelect={field.onChange}
										label="Number"
										disabled={formState.isSubmitting}
										icon={Number}
									/>
									<FieldTypeBox
										active={field.value === FieldType.JSON}
										fieldType={FieldType.JSON}
										description="Data in JSON format"
										onSelect={field.onChange}
										label="JSON"
										disabled={formState.isSubmitting}
										icon={Braces}
									/>
									<FieldTypeBox
										active={field.value === FieldType.LOCATION}
										fieldType={FieldType.LOCATION}
										description="Coordinates in latitude & longitude"
										onSelect={field.onChange}
										label="Location"
										disabled={formState.isSubmitting}
										icon={MapLocationDot}
									/>
								</Grid>
							)}
						/>
						{formState.errors.type?.message && (
							<FormErrorMessage>{formState.errors.type.message}</FormErrorMessage>
						)}
					</FormControl>
					<ButtonWithArrow w="full" mt="auto" disabled={formState.isSubmitting}>
						Submit
					</ButtonWithArrow>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
