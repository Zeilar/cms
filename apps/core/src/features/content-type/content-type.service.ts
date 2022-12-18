import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Injectable, NotFoundException, forwardRef, Inject } from "@nestjs/common";
import { ContentType } from "./content-type.model";
import { ContentTypeRepository } from "./content-type.repository";
import { SpaceService } from "../space/space.service";

@Injectable()
export class ContentTypeService {
	public constructor(
		private readonly contentTypeRepository: ContentTypeRepository,
		@Inject(forwardRef(() => SpaceService))
		private readonly spaceService: SpaceService
	) {}

	public async create({ spaceName, name }: CreateContentTypeDto): Promise<ContentType> {
		const space = await this.spaceService.findByName(spaceName);
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		return this.contentTypeRepository.create(space, { name });
	}

	public findByName(name: string): Promise<ContentType | undefined> {
		return this.contentTypeRepository.findByName(name);
	}

	public findBySpaceName(spaceName: string, withFields?: boolean): Promise<ContentType[]> {
		return this.contentTypeRepository.findBySpaceName(spaceName, withFields);
	}
}
