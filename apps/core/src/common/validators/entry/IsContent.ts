import { EntryContentData, FieldType } from "@shared";
import {
	registerDecorator,
	isDateString,
	isJSON,
	isInt,
	isLatLong,
	isString,
	isBoolean,
} from "class-validator";

interface ContentData {
	type: FieldType;
	data: EntryContentData;
}

function isContent({ data, type }: ContentData): boolean {
	switch (type) {
		case FieldType.BOOLEAN:
			return isBoolean(data);
		case FieldType.DATE:
			return isDateString(data);
		case FieldType.INTEGER:
			return isInt(data);
		case FieldType.JSON:
			return isJSON(data);
		case FieldType.LOCATION:
			return typeof data === "string" && isLatLong(data);
		case FieldType.RICH_TEXT:
			return true; // TODO: make rich text schema
		case FieldType.TEXT:
			return isString(data);
		default:
			return false;
	}
}

export function IsContent(): (object: object, propertyName: string) => void {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "isContent",
			target: object.constructor,
			propertyName,
			options: { message: "Entry data is invalid." },
			validator: {
				validate(content: object | ContentData) {
					return "data" in content ? isContent(content) : false;
				},
			},
		});
	};
}
