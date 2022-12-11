import { FieldType, FieldTypeValues } from "@shared";
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
	data: unknown;
}

function isFieldType(string: FieldType): boolean {
	return FieldTypeValues.includes(string);
}

function validateType({ data, type }: ContentData): boolean {
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
			options: { message: "Entry content JSON is invalid." },
			validator: {
				validate(value: Record<string, ContentData>) {
					for (const property in value) {
						const content = value[property];
						if (!isFieldType(content.type) || !validateType(content)) {
							return false;
						}
					}
					return true;
				},
			},
		});
	};
}
