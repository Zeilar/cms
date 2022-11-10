import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";

export default function ButtonWithArrow({ children, ...props }: ButtonProps) {
	return (
		<Button
			variant="outline"
			type="submit"
			mt={4}
			_hover={{
				"> svg": {
					w: 4,
					h: 4,
					ml: 2,
				},
			}}
			{...props}
		>
			{children}
			<Icon transition="width 0.25s, margin-left 0.25s" w={0} as={ArrowForwardIcon} />
		</Button>
	);
}
