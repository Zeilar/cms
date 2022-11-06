import { CreateEntryDto } from "../../common/validators/entry/CreateEntryDto";
import { Injectable } from "@nestjs/common";
import { Entry } from "./entry.model";
import { EntryRepository } from "./entry.repository";
import type { ID } from "../../types/repository";

@Injectable()
export class EntryService {
	public constructor(private readonly entryRepository: EntryRepository) {}

	public create(dto: CreateEntryDto): Promise<Entry> {
		return this.entryRepository.create(dto);
	}

	public findById(id: ID): Promise<Entry | undefined> {
		return this.entryRepository.findById(id);
	}

	public getAllInContentType(contentTypeId: ID): Promise<Entry[]> {
		return Entry.query().where({ contentTypeId }).execute();
	}
}
