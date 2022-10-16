import { AbsoluteCenter } from "@chakra-ui/react";
import Spinner from "apps/frontend/components/Spinner";
import { API } from "apps/frontend/util/API";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import useSWR from "swr";

interface SpaceDto {
	id: string;
}

interface Props {
	initialData: SpaceDto;
	spaceId: string;
}

function fetcher(spaceId: string) {
	return () => API.fetch<SpaceDto>(`space/${spaceId}`);
}

export default function Page({ initialData, spaceId }: Props) {
	const { data, isValidating } = useSWR(`space-${spaceId}`, fetcher(spaceId), {
		fallbackData: initialData,
	});
	return (
		<div>
			<AbsoluteCenter>
				<Spinner />
			</AbsoluteCenter>
		</div>
	);
}

export async function getServerSideProps({
	params,
}: GetServerSidePropsContext<{ spaceId: string }>): Promise<GetServerSidePropsResult<Props>> {
	if (!params?.spaceId) {
		throw new Error("Missing space id");
	}

	const space = await API.fetch<SpaceDto>(`space/${params.spaceId}`);

	return {
		props: {
			initialData: space,
			spaceId: params?.spaceId,
		},
	};
}
