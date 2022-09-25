import { Injectable, NotFoundException } from "@nestjs/common";
import { Space } from "../space/space.entity";
import { ContentType } from "./content-type.entity";

export interface ContentTypeDto {
	spaceId: string;
	name: string;
}

@Injectable()
export class ContentTypeService {
	public async create({ spaceId, ...dto }: ContentTypeDto) {
		const space = await Space.findOneBy({ id: spaceId });
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		const { identifiers } = await ContentType.insert({ ...dto, space });
		return identifiers[0];
	}
}
