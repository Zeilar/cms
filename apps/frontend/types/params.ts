import { ParsedUrlQuery } from "querystring";

export interface SpacePageParams extends ParsedUrlQuery {
	spaceId: string;
}

export interface ContentTypePageParams extends SpacePageParams {
	contentTypeId: string;
}
