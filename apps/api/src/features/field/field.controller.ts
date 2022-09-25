import { CreateFieldDto } from "@api/common/validators/CreateFieldDto";
import { Body, Controller, Post } from "@nestjs/common";
import { FieldService } from "./field.service";

@Controller("/field")
export class FieldController {
	public constructor(public readonly fieldService: FieldService) {}

	@Post("/")
	public create(@Body() dto: CreateFieldDto) {
		return this.fieldService.create(dto);
	}
}
