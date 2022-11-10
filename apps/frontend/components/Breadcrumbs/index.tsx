import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import Link from "next/link";

interface BreadcrumbItem {
	href?: string;
	label: string;
}

interface Props {
	items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: Props) {
	return items.length > 0 ? (
		<Breadcrumb mb={8}>
			{items.map(({ label, href }, i) => (
				<BreadcrumbItem key={href} isCurrentPage={i === items.length - 1}>
					{href ? (
						<Link href={href} passHref>
							<BreadcrumbLink>{label}</BreadcrumbLink>
						</Link>
					) : (
						<Text as="span">{label}</Text>
					)}
				</BreadcrumbItem>
			))}
		</Breadcrumb>
	) : null;
}
