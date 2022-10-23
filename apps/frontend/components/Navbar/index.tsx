import { Flex } from "@chakra-ui/react";
import UnstyledLink from "../HiddenLink";

interface Item {
	href: string;
	label: string;
}

function NavItem({ href, label }: Item) {
	return (
		<UnstyledLink
			href={href}
			fontWeight={500}
			py={4}
			px={6}
			color="text.inactive"
			_activeLink={{
				color: "text.main",
				pos: "relative",
				bgColor: "blackAlpha.500",
				_after: {
					content: `""`,
					pos: "absolute",
					h: "2px",
					w: "full",
					rounded: "full",
					bgColor: "accent",
					bottom: 0,
					left: 0,
				},
			}}
		>
			{label}
		</UnstyledLink>
	);
}

interface Props {
	items: Item[];
}

export default function Navbar({ items }: Props) {
	return (
		<Flex
			bgColor="gray.800"
			borderBottomWidth={1}
			borderBottomColor="border"
			pos="sticky"
			top={0}
		>
			{items.map(item => (
				<NavItem key={item.href} {...item} />
			))}
		</Flex>
	);
}
