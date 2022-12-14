import { Box, Container } from "@chakra-ui/react";
import Breadcrumbs, { IBreadcrumbItem } from "../../Breadcrumbs";
import HoverList from "../../HoverList";
import { IHoverListItem } from "../../HoverList/types";
import Col from "../Col";

interface Props {
	children: React.ReactNode;
	navbarItems?: IHoverListItem[];
	breadcrumbs?: IBreadcrumbItem[];
}

export default function MainContent({ children, navbarItems = [], breadcrumbs = [] }: Props) {
	return (
		<Col grow={1}>
			<Box borderBottomWidth={1} bgColor="gray.600" px={2}>
				{navbarItems.length > 0 && (
					<Container maxW="container.xl">
						<HoverList variant="line" direction="row" items={navbarItems} />
					</Container>
				)}
			</Box>
			<Container py={8} maxW="container.xl">
				{breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
				{children}
			</Container>
		</Col>
	);
}
