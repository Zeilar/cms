import { FieldDto, FieldType } from "./field";
import { Timestamps } from "./repository";

interface RichText {
	[key: string]: any;
}

interface EntryContentDefault {
	field: string;
}

export interface EntryContentRichText extends EntryContentDefault {
	type: FieldType.RICH_TEXT;
	data: RichText;
}

export interface EntryContentDate extends EntryContentDefault {
	type: FieldType.DATE;
	data: string;
}

export interface EntryContentBoolean extends EntryContentDefault {
	type: FieldType.BOOLEAN;
	data: number;
}

export interface EntryContentJSON extends EntryContentDefault {
	type: FieldType.JSON;
	data: number;
}

export interface EntryContentInteger extends EntryContentDefault {
	type: FieldType.INTEGER;
	data: number;
}

export interface EntryContentLocation extends EntryContentDefault {
	type: FieldType.LOCATION;
	data: string;
}

export interface EntryContentText extends EntryContentDefault {
	type: FieldType.TEXT;
	data: string;
}

export type EntryContentData = string | number | RichText;

export type EntryContent =
	| EntryContentRichText
	| EntryContentDate
	| EntryContentJSON
	| EntryContentBoolean
	| EntryContentInteger
	| EntryContentLocation
	| EntryContentText;

export interface EntryDto extends Timestamps {
	id: string;
	field?: FieldDto;
	content: EntryContent[];
}

export enum EntryStatus {
	DRAFT = "draft",
	PUBLISHED = "published",
}

export interface CreateEntryDto {
	status: EntryStatus;
	content: EntryContent[];
	spaceName: string;
	contentTypeName: string;
}

export const EntryStatusValues = Object.values(EntryStatus);
