import { IsUUID } from "class-validator";
import { IsContent } from "./IsContent";

export class CreateEntryDto {
	@IsUUID("4")
	public spaceId: string;

	@IsUUID("4")
	public contentTypeId: string;

	@IsContent()
	public content: Record<string, unknown>;
}
