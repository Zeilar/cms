import { ListItem } from "@chakra-ui/react";
import Link from "../Link";
import type { IHoverListItem } from "./types/hoverListItem";

export default function HoverListLineItem({ label, href, strict, active }: IHoverListItem) {
	return (
		<ListItem pointerEvents="none">
			<Link
				href={href}
				active={active}
				strict={strict}
				pointerEvents="all"
				fontWeight={500}
				display="flex"
				alignItems="center"
				h={14}
				px={4}
				pos="relative"
				_hover={{ textDecor: "none" }}
				_after={{
					display: "none",
					content: `""`,
					pos: "absolute",
					bottom: "-1px",
					left: 0,
					w: "full",
					h: "1px",
					bgColor: "accent.main",
					rounded: "full",
				}}
				_activeLink={{
					color: "accent.main",
					_after: { display: "block" },
				}}
			>
				{label}
			</Link>
		</ListItem>
	);
}
