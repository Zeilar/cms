import { CreateEntryDto } from "../../common/validators/entry/CreateEntryDto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Entry } from "./entry.model";
import type { ID } from "../../types/repository";
import { Space } from "../space/space.model";

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

	public create(entry: CreateEntryDto): Promise<Entry> {
		return Entry.query().insertAndFetch(entry).execute();
	}
}
