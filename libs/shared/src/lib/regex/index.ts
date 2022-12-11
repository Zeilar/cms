export class Regex {
	public static onlyLetters = /^\p{L}+$/;
	public static password = /^\S+$/;
	public static registerToken = /^([A-z]|[0-9])$/;
}
