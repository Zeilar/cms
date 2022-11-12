import { CreateFieldDto } from "../../common/validators/field/CreateFieldDto";
import { Body, Controller, Get, Query, Post, BadRequestException } from "@nestjs/common";
import { FieldService } from "./field.service";
import { Field } from "./field.model";

@Controller("/field")
export class FieldController {
	public constructor(public readonly fieldService: FieldService) {}

	@Post("/")
	public create(@Body() dto: CreateFieldDto): Promise<Field> {
		return this.fieldService.create(dto);
	}

	@Get("/")
	public async findByContentTypeName(
		@Query("contentTypeName") contentTypeName?: string,
		@Query("spaceName") spaceName?: string
	): Promise<Field[]> {
		if (contentTypeName === undefined) {
			throw new BadRequestException("Missing Content Type name.");
		}
		if (spaceName === undefined) {
			throw new BadRequestException("Missing Space name.");
		}
		return this.fieldService.findByContentTypeName(spaceName, contentTypeName);
	}
}
