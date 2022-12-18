import { FieldTypeValues } from "../types";

export class Regex {
	public static onlyLetters = /^[A-z]+$/;
	public static password = /^\S+$/;
	public static registerToken = /^([A-z]|[0-9])$/;
	public static fieldType = new RegExp(`^(${FieldTypeValues.join("|")})$`);
}
