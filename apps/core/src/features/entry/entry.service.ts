import { CreateEntryDto } from "../../common/validators/entry/CreateEntryDto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Entry } from "./entry.model";
import { EntryRepository } from "./entry.repository";
import type { ID } from "../../types/repository";
import { ContentTypeService } from "../content-type/content-type.service";
import { SpaceService } from "../space/space.service";

@Injectable()
export class EntryService {
	public constructor(
		private readonly entryRepository: EntryRepository,
		private readonly contentTypeService: ContentTypeService,
		private readonly spaceService: SpaceService
	) {}

	public async create({ spaceName, contentTypeName, content }: CreateEntryDto): Promise<Entry> {
		const space = await this.spaceService.findByName(spaceName);
		if (!space) {
			throw new NotFoundException("Space not found");
		}
		const contentType = await this.contentTypeService.findByName(contentTypeName);
		if (!contentType) {
			throw new NotFoundException("Content Type not found");
		}
		return this.entryRepository.create(contentType, { content, spaceId: space.id });
	}

	public findById(id: ID): Promise<Entry | undefined> {
		return this.entryRepository.findById(id);
	}

	public findBySpaceName(spaceName: string): Promise<Entry[]> {
		return this.entryRepository.findBySpaceName(spaceName);
	}
}
