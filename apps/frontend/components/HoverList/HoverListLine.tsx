import { Box } from "@chakra-ui/react";
import MotionBox from "../layout/MotionBox";
import { HoverPosition } from "./types/hoverPosition";

export default function HoverListLine({ width, x, y }: HoverPosition) {
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
				pointerEvents="none"
				pos="fixed"
				bgColor="accent.main"
				top={`${y}px`}
				left={`${x}px`}
				w={`${width}px`}
				h="1px"
			/>
		</MotionBox>
	);
}
