import { Box } from "@chakra-ui/react";
import MotionBox from "../layout/MotionBox";
import { HoverPosition } from "./types/hoverPosition";

export default function HoverListBox({ height, width, x, y }: HoverPosition) {
	return (
		<MotionBox
			transition={{ duration: 0.15 }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			pos="fixed"
		>
			<Box
				transition="0.15s"
				rounded="lg"
				pointerEvents="none"
				pos="fixed"
				p={4}
				bgColor="gray.700"
				top={`${y}px`}
				left={`${x + 4}px`}
				w={`${width - 8}px`}
				h={`${height}px`}
			/>
		</MotionBox>
	);
}
