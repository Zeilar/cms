import { Flex, List } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HoverListBox from "./HoverListBox";
import HoverListBoxItem from "./HoverListIBoxItem";
import HoverListLine from "./HoverListLine";
import HoverListLineItem from "./HoverListLineItem";
import { HoverPosition, IHoverListItem } from "./types";

interface HoverListProps {
	items: IHoverListItem[];
	direction?: "column" | "row";
	variant?: "box" | "line";
}

export default function HoverList({
	items,
	direction = "column",
	variant = "box",
}: HoverListProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [hoverPosition, setHoverPosition] = useState<HoverPosition | null>(null);

	useEffect(() => {
		function mouseLeaveHandler() {
			setHoverPosition(null);
		}

		function hoverHandler(e: MouseEvent) {
			const target = e.target as HTMLElement;

			if (!ref.current || target.getAttribute("aria-current") === "page") {
				setHoverPosition(null);
				return;
			}

			if (target.getAttribute("aria-current") === "page") {
				return;
			}

			if (target.closest("[data-hoverlist]") !== ref.current) {
				setHoverPosition(null);
				return;
			}

			const { x, y, width, height } = target.getBoundingClientRect();

			setHoverPosition({
				x,
				y: variant === "line" ? y + height : y,
				width,
				height,
			});
		}

		document.addEventListener("mousemove", hoverHandler);
		document.addEventListener("mouseleave", mouseLeaveHandler);

		return () => {
			document.removeEventListener("mousemove", hoverHandler);
			document.removeEventListener("mouseleave", mouseLeaveHandler);
		};
	}, [variant]);

	return (
		<Flex flexDir={direction} as={List} ref={ref} data-hoverlist pointerEvents="none" gap={1}>
			<AnimatePresence>
				{hoverPosition !== null && variant === "box" && <HoverListBox {...hoverPosition} />}
				{hoverPosition !== null && variant === "line" && (
					<HoverListLine {...hoverPosition} />
				)}
			</AnimatePresence>
			{items.map(item =>
				variant === "box" ? (
					<HoverListBoxItem key={item.href} {...item} />
				) : (
					<HoverListLineItem key={item.href} {...item} />
				)
			)}
		</Flex>
	);
}
