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
import { Callback, ContentTypeDto, CreateEntryDto, FieldDto } from "@shared";
import { API, ParsedResponse } from "apps/frontend/util/API";
import { useFetch } from "apps/frontend/hooks";
import Spinner from "../Spinner";

interface Props {
	onClose: Callback;
	onSubmit: Callback;
	isOpen: boolean;
	spaceName: string;
}

interface Fields {
	name: string;
}

function getContentTypes(spaceName: string): Callback<Promise<ParsedResponse<ContentTypeDto[]>>> {
	return () =>
		API.fetch<ContentTypeDto[]>("content-type", { query: { spaceName, withFields: true } });
}

export default function CreateEntryForm({ spaceName, isOpen, onSubmit, onClose }: Props) {
	const contentTypesQuery = useFetch<ContentTypeDto[]>(
		"entry-form-contenttypes",
		getContentTypes(spaceName)
	);
	const { handleSubmit, register, formState, reset } = useForm<Fields>({
		defaultValues: {
			name: "",
		},
		mode: "onSubmit",
	});

	async function submit({}: Fields): Promise<void> {
		const { ok, error } = await API.fetch("entry", {
			method: "POST",
			data: { spaceName } as CreateEntryDto,
		});
		if (!ok) {
			return;
		}
		onClose();
		reset();
		onSubmit();
	}

	console.log(contentTypesQuery.data);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create Entry</ModalHeader>
				<ModalCloseButton />
				<ModalBody as="form" onSubmit={handleSubmit(submit)}>
					{contentTypesQuery.isValidating ? (
						<Spinner mx="auto" />
					) : (
						<ButtonWithArrow w="full" mt="auto" disabled={formState.isSubmitting}>
							Submit
						</ButtonWithArrow>
					)}
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
