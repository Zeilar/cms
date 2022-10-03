import { CreateSpaceDto } from "../../common/validators/space/CreateSpaceDto";
import {
	Body,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { SpaceService } from "./space.service";
import type { ID } from "../../types/repository";
import { Space } from "./space.model";
import { UpdateSpaceDto } from "../../common/validators/space/UpdateSpaceDto";

@Controller("/space")
export class SpaceController {
	public constructor(public readonly spaceService: SpaceService) {}

	private async assertSpaceFound(id: ID) {
		if (await this.spaceService.exists(id)) {
			return;
		}
		throw new NotFoundException("Space not found");
	}

	@Post("/")
	public create(@Body() dto: CreateSpaceDto): Promise<Space> {
		return this.spaceService.create(dto);
	}

	@Get("/:id")
	public async findById(@Param("id") id: ID): Promise<Space> {
		await this.assertSpaceFound(id);
		const space = await this.spaceService.findById(id);
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		return space;
	}

	@Delete("/:id")
	public async destroy(@Param("id") id: ID): Promise<void> {
		await this.assertSpaceFound(id);
		const success = await this.spaceService.destroy(id);
		if (!success) {
			throw new InternalServerErrorException("Failed deleting space");
		}
	}

	@Patch("/:id")
	public async edit(@Param("id") id: ID, @Body() body: UpdateSpaceDto): Promise<Space> {
		await this.assertSpaceFound(id);
		const result = await this.spaceService.edit(id, body);
		if (!result) {
			throw new InternalServerErrorException("Failed updating space");
		}
		return result;
	}
}
