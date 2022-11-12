import { FieldDto, FieldType } from "./field";
import { Timestamps } from "./repository";

interface RichText {
	[key: string]: any;
}

export interface EntryContentRichText {
	type: FieldType.RICH_TEXT;
	data: RichText;
}

export interface EntryContentDate {
	type: FieldType.DATE;
	data: string;
}

export interface EntryContentBoolean {
	type: FieldType.BOOLEAN;
	data: number;
}

export interface EntryContentJSON {
	type: FieldType.JSON;
	data: number;
}

export interface EntryContentInteger {
	type: FieldType.INTEGER;
	data: number;
}

export interface EntryContentLocation {
	type: FieldType.LOCATION;
	data: string;
}

export interface EntryContentText {
	type: FieldType.TEXT;
	data: string;
}

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
	content: EntryContent;
}

export enum EntryStatus {
	DRAFT = "draft",
	PUBLISHED = "published",
}

export const EntryStatusValues = Object.values(EntryStatus);
