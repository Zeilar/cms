import { Flex } from "@chakra-ui/react";
import Spinner from "apps/frontend/components/Spinner";
import { API } from "apps/frontend/util/API";
import { SpaceDto } from "@shared";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";
import { SpacePageParams } from "apps/frontend/types/params";
import Col from "apps/frontend/components/layout/Col";
import UnstyledLink from "apps/frontend/components/HiddenLink";

interface Props {
	initialData: SpaceDto;
	spaceId: string;
}

function fetcher(spaceId: string) {
	return () => API.fetch<SpaceDto>(`space/${spaceId}?wct=true`);
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
			p={6}
			_activeLink={{
				pos: "relative",
				bgColor: "whiteAlpha.50",
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

export default function Page({ initialData, spaceId }: Props) {
	const { data, isValidating } = useSWR(`space-${spaceId}`, fetcher(spaceId), {
		fallbackData: initialData,
	});
	return (
		<Col grow={1} boxShadow="md">
			<Flex bgColor="gray.900">
				<NavItem href="/37ac4fda-2242-422f-a42b-5e9a8851549e" label="Overview" />
			</Flex>
			<p>{data?.name}</p>
			<pre>{JSON.stringify(data?.contentTypes, null, 4)}</pre>
			{isValidating && <Spinner />}
		</Col>
	);
}

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<SpacePageParams>): Promise<GetServerSidePropsResult<Props>> {
	const spaceId = params?.spaceId;
	if (!spaceId) {
		throw new Error("Missing space id");
	}
	const space = await fetcher(spaceId)();
	return {
		props: {
			initialData: space,
			spaceId,
		},
	};
}
