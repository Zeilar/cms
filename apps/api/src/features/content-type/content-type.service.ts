import { CreateContentTypeDto } from "../../common/validators/CreateContentTypeDto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Space } from "../space/space.entity";
import { ContentType } from "./content-type.entity";

@Injectable()
export class ContentTypeService {
	public async create({ spaceId, ...dto }: CreateContentTypeDto) {
		const space = await Space.findOneBy({ id: spaceId });
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		const { identifiers } = await ContentType.insert({ ...dto, space });
		return identifiers[0];
	}
}
