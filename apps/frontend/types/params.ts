import { ParsedUrlQuery } from "querystring";

export interface SpacePageParams extends ParsedUrlQuery {
	spaceName: string;
}

export interface ContentTypePageParams extends SpacePageParams {
	contentTypeId: string;
}
