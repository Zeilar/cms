import { ContentTypeDto } from "./contentType";
import { Timestamps } from "./repository";

export interface SpaceDto extends Timestamps {
	id: string;
	name: string;
	contentTypes?: ContentTypeDto[];
}
