import { Regex, SpaceValidation } from "@shared";
import { Length, Matches } from "class-validator";

export class UpdateSpaceDto {
	@Matches(Regex.onlyLetters)
	@Length(SpaceValidation.NAME_MIN_LENGTH, SpaceValidation.NAME_MAX_LENGTH)
	public name: string;
}
