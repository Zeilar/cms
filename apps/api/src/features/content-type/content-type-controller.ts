import { Body, Controller, Post } from "@nestjs/common";
import { ContentTypeDto, ContentTypeService } from "./content-type.service";

@Controller("/content-type")
export class ContentTypeController {
	public constructor(public readonly contentTypeService: ContentTypeService) {}

	@Post("/")
	public create(@Body() dto: ContentTypeDto) {
		return this.contentTypeService.create(dto);
	}
}
