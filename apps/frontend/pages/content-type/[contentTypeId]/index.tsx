import { Flex } from "@chakra-ui/react";
import Spinner from "apps/frontend/components/Spinner";
import { API } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";
import { ContentTypePageParams } from "apps/frontend/types/params";
import Col from "apps/frontend/components/layout/Col";
import UnstyledLink from "apps/frontend/components/HiddenLink";

interface Props {
	initialData: SpaceDto;
	contentTypeId: string;
}

function fetcher(contentTypeId: string) {
	return async () => (await API.fetch<SpaceDto>(`content-type/${contentTypeId}?we=true`)).data;
}

interface NavItemProps {
	href: string;
	label: string;
}

function NavItem({ href, label }: NavItemProps) {
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

export default function Page({ initialData, contentTypeId }: Props) {
	const { data, isValidating } = useSWR(`contentType-${contentTypeId}`, fetcher(contentTypeId), {
		fallbackData: initialData,
	});
	return <Col grow={1}>{isValidating && <Spinner />}</Col>;
}

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<ContentTypePageParams>): Promise<GetServerSidePropsResult<Props>> {
	const contentTypeId = params?.contentTypeId;
	if (!contentTypeId) {
		throw new Error("Missing space id");
	}
	const space = await fetcher(contentTypeId)();
	return {
		props: {
			initialData: space,
			contentTypeId,
		},
	};
}