import { List } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Col from "../layout/Col";
import HoverListBox from "./HoverListBox";
import HoverListItem from "./HoverListItem";
import { HoverPosition, IHoverListItem } from "./types";

interface HoverListProps {
	items: IHoverListItem[];
}

export default function HoverList({ items }: HoverListProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [hoverPosition, setHoverPosition] = useState<HoverPosition | null>(null);

	useEffect(() => {
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
				y,
				width,
				height,
			});
		}

		document.addEventListener("mousemove", hoverHandler);

		return () => {
			document.removeEventListener("mousemove", hoverHandler);
		};
	}, []);

	return (
		<Col as={List} ref={ref} data-hoverlist pointerEvents="none" gap={1}>
			<AnimatePresence>
				{hoverPosition !== null && <HoverListBox {...hoverPosition} />}
			</AnimatePresence>
			{items.map(item => (
				<HoverListItem key={item.href} {...item} />
			))}
		</Col>
	);
}
