import { chakra, Icon, Text } from "@chakra-ui/react";
import { FieldType } from "@shared";
import { Check2Circle } from "@styled-icons/bootstrap/Check2Circle";

interface Props {
	fieldType: FieldType;
	description: string;
	onSelect(fieldType: FieldType): void;
	active: boolean;
	label: string;
	disabled: boolean;
}

const Button = chakra("button");

export default function FieldTypeBox({
	fieldType,
	description,
	onSelect,
	active,
	label,
	disabled,
}: Props) {
	return (
		<Button
			display="flex"
			flexDir="column"
			alignItems="center"
			onClick={() => onSelect(fieldType)}
			p={4}
			borderWidth={2}
			borderColor={active ? "accent.main" : undefined}
			rounded="lg"
			pos="relative"
			type="button"
			disabled={disabled}
			_disabled={{ opacity: 0.5, cursor: "not-allowed" }}
		>
			{active && (
				<Icon
					pos="absolute"
					right={2}
					top={2}
					as={Check2Circle}
					w={6}
					h={6}
					color="accent.main"
				/>
			)}
			<Text fontWeight="semibold" fontSize="lg" mb={2}>
				{label}
			</Text>
			<Text whiteSpace="pre-wrap" fontSize="sm">
				{description}
			</Text>
		</Button>
	);
}
