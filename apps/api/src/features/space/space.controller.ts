import { Body, Controller, Post } from "@nestjs/common";
import { SpaceDto, SpaceService } from "./space.service";

@Controller("/space")
export class SpaceController {
	public constructor(public readonly spaceService: SpaceService) {}

	@Post("/")
	public create(@Body() dto: SpaceDto) {
		this.spaceService.create(dto);
	}
}
