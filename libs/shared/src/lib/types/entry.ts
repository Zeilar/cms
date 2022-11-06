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

export interface EntryContentDecimal {
	type: FieldType.DECIMAL;
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
	| EntryContentDecimal
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
