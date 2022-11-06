import { CreateEntryDto } from "../../common/validators/entry/CreateEntryDto";
import { Injectable } from "@nestjs/common";
import { Entry } from "./entry.model";
import type { ID } from "../../types/repository";

@Injectable()
export class EntryRepository {
	public findById(id: ID): Promise<Entry | undefined> {
		return Entry.query().findById(id).execute();
	}

	public create(entry: CreateEntryDto): Promise<Entry> {
		return Entry.query().insertAndFetch(entry).execute();
	}
}
