import { FormLabel, Heading, Icon, Tooltip } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

interface Props {
	id: string;
	heading: string;
	tooltipLabel: React.ReactNode;
}

export default function EnhancedFormLabel({ id, heading, tooltipLabel }: Props) {
	return (
		<FormLabel htmlFor={id} display="flex" alignItems="center">
			<Heading size="sm">{heading}</Heading>
			<Tooltip
				bgColor="gray.400"
				color="inherit"
				paddingInline={2}
				paddingBlock={2}
				mb={2}
				hasArrow
				placement="top"
				label={tooltipLabel}
			>
				<Icon as={QuestionOutlineIcon} ml={2} sx={{ "> g": { strokeWidth: 2 } }} />
			</Tooltip>
		</FormLabel>
	);
}
