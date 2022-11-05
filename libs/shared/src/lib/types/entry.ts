import { FieldDto } from "./field";
import { Timestamps } from "./repository";

export interface EntryDto extends Timestamps {
	id: string;
	field?: FieldDto;
}

export enum EntryStatus {
	DRAFT = "draft",
	PUBLISHED = "published",
}

export const EntryStatusValues = Object.values(EntryStatus);
