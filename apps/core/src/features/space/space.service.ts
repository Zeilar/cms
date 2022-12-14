import { CreateSpaceDto } from "../../common/validators/space/CreateSpaceDto";
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Space } from "./space.model";
import { SpaceRepository } from "./space.repository";
import type { ID } from "../../types/repository";
import { UpdateSpaceDto } from "../../common/validators/space/UpdateSpaceDto";
import { ContentTypeService } from "../content-type/content-type.service";

@Injectable()
export class SpaceService {
	public constructor(
		private readonly spaceRepository: SpaceRepository,
		@Inject(forwardRef(() => ContentTypeService))
		private readonly contentTypeService: ContentTypeService
	) {}

	public all(): Promise<Space[]> {
		return this.spaceRepository.all();
	}

	public create(dto: CreateSpaceDto): Promise<Space> {
		return this.spaceRepository.create(dto);
	}

	public async findByName(name: string, wct?: boolean): Promise<Space | undefined> {
		const space = await this.spaceRepository.findByName(name);
		if (!space || !wct) {
			return space;
		}
		space.contentTypes = await this.contentTypeService.findBySpaceName(space.id);
		return space;
	}

	public edit(id: ID, dto: UpdateSpaceDto): Promise<Space | null> {
		return this.spaceRepository.edit(id, dto);
	}

	public destroy(id: ID): Promise<number> {
		return this.spaceRepository.destroy(id);
	}
}
