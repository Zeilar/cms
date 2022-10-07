import { CreateFieldDto } from "../../common/validators/field/CreateFieldDto";
import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { FieldService } from "./field.service";
import type { ID } from "../../types/repository";
import { Field } from "./field.model";

@Controller("/field")
export class FieldController {
	public constructor(public readonly fieldService: FieldService) {}

	@Post("/")
	public create(@Body() dto: CreateFieldDto): Promise<Field> {
		return this.fieldService.create(dto);
	}

	@Get("/:id")
	public async findById(@Param("id") id: ID): Promise<Field> {
		const field = await this.fieldService.findById(id);
		if (!field) {
			throw new NotFoundException("Field not found");
		}
		return field;
	}
}
