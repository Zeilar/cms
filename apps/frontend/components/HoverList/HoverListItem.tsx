import { ListItem, VisuallyHidden } from "@chakra-ui/react";
import Link from "../Link";
import type { IHoverListItem } from "./types/hoverListItem";

export default function HoverListItem({ label, href }: IHoverListItem) {
	return (
		<ListItem pointerEvents="none">
			<Link
				pointerEvents="all"
				fontWeight={500}
				href={href}
				display="flex"
				alignItems="center"
				h={12}
				px={4}
				pos="relative"
				_hover={{ textDecor: "none" }}
				_before={{
					display: "none",
					content: `""`,
					pos: "absolute",
					top: 0,
					left: "4px",
					w: "calc(100% - 8px)",
					h: "full",
					bgColor: "gray.800",
					rounded: "lg",
				}}
				_activeLink={{
					color: "accent.main",
					_before: { display: "block" },
				}}
				_after={{
					content: `"${label}"`,
					zIndex: 10,
				}}
			>
				<VisuallyHidden>{label}</VisuallyHidden>
			</Link>
		</ListItem>
	);
}