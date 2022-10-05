import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Body, Controller, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { ContentTypeService } from "./content-type.service";
import type { ID } from "../../types/repository";
import { ContentType } from "./content-type.model";

@Controller("/content-type")
export class ContentTypeController {
	public constructor(public readonly contentTypeService: ContentTypeService) {}

	private assertContentTypeFound(contentType: unknown): asserts contentType is ContentType {
		if (contentType instanceof ContentType) {
			return;
		}
		throw new NotFoundException("Space not found");
	}

	@Post("/")
	public create(@Body() dto: CreateContentTypeDto): Promise<ContentType> {
		return this.contentTypeService.create(dto);
	}

	/**
	 * WF stands for "with fields"
	 */
	@Get("/:id")
	public async findById(
		@Param("id") id: ID,
		@Query("wf") wf: "true" | undefined
	): Promise<ContentType> {
		const contentType = await this.contentTypeService.findById(id, wf === "true");
		this.assertContentTypeFound(contentType);
		return contentType;
	}
}
