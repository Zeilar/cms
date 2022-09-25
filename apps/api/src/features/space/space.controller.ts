import { CreateSpaceDto } from "@api/common/validators/CreateSpaceDto";
import { Body, Controller, Post } from "@nestjs/common";
import { SpaceService } from "./space.service";

@Controller("/space")
export class SpaceController {
	public constructor(public readonly spaceService: SpaceService) {}

	@Post("/")
	public create(@Body() dto: CreateSpaceDto) {
		return this.spaceService.create(dto);
	}
}
