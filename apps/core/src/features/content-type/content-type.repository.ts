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

	public findByName(name: string): Promise<ContentType | undefined> {
		return ContentType.query().findOne("name", name).execute();
	}

	public async findBySpaceName(spaceName: string, withFields?: boolean): Promise<ContentType[]> {
		const space = await Space.query().findOne("name", spaceName);
		if (!space) {
			throw new NotFoundException("Space not found.");
		}
		let query = ContentType.query().where({ spaceId: space.id });
		if (withFields) {
			query = query.withGraphFetched("fields");
		}
		return query.execute();
	}
}
