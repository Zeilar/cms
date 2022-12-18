import { CreateContentTypeDto } from "../../common/validators/content-type/CreateContentTypeDto";
import { Body, Controller, Get, Post, Query, BadRequestException } from "@nestjs/common";
import { ContentTypeService } from "./content-type.service";
import { ContentType } from "./content-type.model";
import { BooleanString } from "@shared";

@Controller("/content-type")
export class ContentTypeController {
	public constructor(public readonly contentTypeService: ContentTypeService) {}

	@Post("/")
	public create(@Body() dto: CreateContentTypeDto): Promise<ContentType> {
		return this.contentTypeService.create(dto);
	}

	@Get("/")
	public async findBySpaceName(
		@Query("spaceName") spaceName?: string,
		@Query("withFields") withFields?: BooleanString
	): Promise<ContentType[]> {
		if (typeof spaceName !== "string") {
			throw new BadRequestException("Missing space name.");
		}
		return this.contentTypeService.findBySpaceName(spaceName, withFields === "true");
	}
}
