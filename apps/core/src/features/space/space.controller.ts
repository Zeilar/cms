import { CreateSpaceDto } from "../../common/validators/space/CreateSpaceDto";
import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { SpaceService } from "./space.service";
import type { ID } from "../../types/repository";
import { Space } from "./space.model";
import { UpdateSpaceDto } from "../../common/validators/space/UpdateSpaceDto";
import { validate } from "uuid";

@Controller("/space")
export class SpaceController {
	public constructor(public readonly spaceService: SpaceService) {}

	private assertSpaceFound(space: unknown): asserts space is Space {
		if (space instanceof Space) {
			return;
		}
		throw new NotFoundException("Space not found");
	}

	// MAKE THESE PIPE MIDDLEWARES
	private assertIsUuid(data: unknown) {
		if (typeof data == "string" && validate(data)) {
			return;
		}
		throw new BadRequestException("Space id must be a uuid");
	}

	@Get("/")
	public index(): Promise<Space[]> {
		return this.spaceService.all();
	}

	@Post("/")
	public async create(@Body() dto: CreateSpaceDto): Promise<Space> {
		const existingSpace = await this.spaceService.findByName(dto.name);
		if (existingSpace) {
			throw new ConflictException("A space with that name already exists.");
		}
		return this.spaceService.create(dto);
	}

	/**
	 * WCT stands for "with content types"
	 */
	@Get("/:name")
	public async findByName(
		@Param("name") name: string,
		@Query("wct") wct?: "true"
	): Promise<Space> {
		const space = await this.spaceService.findByName(name, wct === "true");
		this.assertSpaceFound(space);
		return space;
	}

	@Delete("/:id")
	public async destroy(@Param("id") id: ID): Promise<void> {
		const success = await this.spaceService.destroy(id);
		if (success === 0) {
			throw new InternalServerErrorException("Failed deleting space");
		}
	}

	@Patch("/:id")
	public async edit(@Param("id") id: ID, @Body() body: UpdateSpaceDto): Promise<Space> {
		const result = await this.spaceService.edit(id, body);
		if (!result) {
			throw new InternalServerErrorException("Failed updating space");
		}
		return result;
	}
}
