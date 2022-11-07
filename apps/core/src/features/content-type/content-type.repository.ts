import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Injectable, NotFoundException } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { ContentType } from "./content-type.model";
import { Space } from "../space/space.model";

@Injectable()
export class ContentTypeRepository {
	public findById(id: ID): Promise<ContentType | undefined> {
		return ContentType.query().findById(id).execute();
	}

	public create(contentType: CreateContentTypeDto): Promise<ContentType> {
		return ContentType.query().insertAndFetch(contentType).execute();
	}

	public async findBySpaceName(spaceName: string): Promise<ContentType[]> {
		const space = await Space.query().findOne("name", spaceName);
		if (!space) {
			throw new NotFoundException("Space not found.");
		}
		return ContentType.query().where({ spaceId: space.id }).execute();
	}
}
