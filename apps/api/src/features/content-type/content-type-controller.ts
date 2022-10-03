import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { ContentTypeService } from "./content-type.service";
import type { ID } from "../../types/repository";
import { ContentType } from "./content-type.model";

@Controller("/content-type")
export class ContentTypeController {
	public constructor(public readonly contentTypeService: ContentTypeService) {}

	@Post("/")
	public create(@Body() dto: CreateContentTypeDto): Promise<ContentType> {
		return this.contentTypeService.create(dto);
	}

	@Get("/:id")
	public async findById(@Param("id") id: ID): Promise<ContentType> {
		const contentType = await this.contentTypeService.findById(id);
		if (!contentType) {
			throw new NotFoundException("ContentType not found");
		}
		return contentType;
	}
}
