import { ContentTypeDto } from "./contentType";

export interface SpaceDto {
	id: string;
	name: string;
	contentTypes?: ContentTypeDto[];
}
