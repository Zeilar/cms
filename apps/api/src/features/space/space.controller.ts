import { CreateSpaceDto } from "../../common/validators/CreateSpaceDto";
import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { SpaceService } from "./space.service";
import type { ID } from "../../types/repository";
import { Space } from "./space.model";

@Controller("/space")
export class SpaceController {
	public constructor(public readonly spaceService: SpaceService) {}

	@Post("/")
	public create(@Body() dto: CreateSpaceDto): Promise<Space> {
		return this.spaceService.create(dto);
	}

	@Get("/:id")
	public async findById(@Param("id") id: ID): Promise<Space> {
		const space = await this.spaceService.findById(id);
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		return space;
	}
}
