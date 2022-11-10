import { Injectable, NotFoundException } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { Space } from "../space/space.model";
import { ContentType } from "./content-type.model";

interface CreateContentTypeArgs {
	name: string;
}

@Injectable()
export class ContentTypeRepository {
	public findById(id: ID): Promise<ContentType | undefined> {
		return ContentType.query().findById(id).execute();
	}

	public create(space: Space, { name }: CreateContentTypeArgs): Promise<ContentType> {
		return space
			.$relatedQuery("contentTypes")
			.insertAndFetch({ name, spaceId: space.id })
			.execute();
	}

	public async findBySpaceName(spaceName: string): Promise<ContentType[]> {
		const space = await Space.query().findOne("name", spaceName);
		if (!space) {
			throw new NotFoundException("Space not found.");
		}
		return ContentType.query().where({ spaceId: space.id }).execute();
	}
}
