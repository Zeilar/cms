import { CreateContentTypeDto } from "@api/common/validators/CreateContentTypeDto";
import { Body, Controller, Post } from "@nestjs/common";
import { ContentTypeService } from "./content-type.service";

@Controller("/content-type")
export class ContentTypeController {
	public constructor(public readonly contentTypeService: ContentTypeService) {}

	@Post("/")
	public create(@Body() dto: CreateContentTypeDto) {
		return this.contentTypeService.create(dto);
	}
}
