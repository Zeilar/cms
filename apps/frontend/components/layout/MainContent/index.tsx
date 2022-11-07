import { Box, Container } from "@chakra-ui/react";
import HoverList from "../../HoverList";
import { IHoverListItem } from "../../HoverList/types";
import Col from "../Col";

interface Props {
	children: React.ReactNode;
	navbarItems?: IHoverListItem[];
}

export default function MainContent({ children, navbarItems }: Props) {
	return (
		<Col grow={1}>
			<Box borderBottomWidth={1} bgColor="gray.600" p={2}>
				{navbarItems && navbarItems.length > 0 && (
					<Container maxW="container.lg">
						<HoverList direction="row" items={navbarItems} />
					</Container>
				)}
			</Box>
			<Container py={8} maxW="container.lg">
				{children}
			</Container>
		</Col>
	);
}
