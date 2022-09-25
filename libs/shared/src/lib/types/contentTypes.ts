export enum FieldType {
	INTEGER = "integer",
	DECIMAL = "decimal",
	DATE = "date",
	RICH_TEXT = "rich-text",
	TEXT_SHORT = "text-short",
	TEXT_LONG = "text-long",
	LOCATION = "location",
}

export const FieldTypeKeys = Object.keys(FieldType);
export const FieldTypeValues = Object.values(FieldType);
