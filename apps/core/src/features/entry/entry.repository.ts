import { Injectable, NotFoundException } from "@nestjs/common";
import { Entry } from "./entry.model";
import type { ID } from "../../types/repository";
import { Space } from "../space/space.model";
import { ContentType } from "../content-type/content-type.model";
import { ContentDto } from "../../common/validators/entry/ContentDto";

interface CreateEntryArgs {
	content: ContentDto[];
	spaceId: string;
}

@Injectable()
export class EntryRepository {
	public findById(id: ID): Promise<Entry | undefined> {
		return Entry.query().findById(id).execute();
	}

	public async findBySpaceName(spaceName: string): Promise<Entry[]> {
		const space = await Space.query().findOne("name", spaceName);
		if (!space) {
			throw new NotFoundException("Space not found.");
		}
		return Entry.query().where({ spaceId: space.id }).execute();
	}

	public create(contentType: ContentType, { content, spaceId }: CreateEntryArgs): Promise<Entry> {
		return contentType
			.$relatedQuery("entries")
			.insertAndFetch({
				spaceId,
				contentTypeId: contentType.id,
				content,
			})
			.execute();
	}
}
