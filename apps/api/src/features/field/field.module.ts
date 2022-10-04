import { Module } from "@nestjs/common";
import { FieldController } from "./field.controller";
import { FieldRepository } from "./field.repository";
import { FieldService } from "./field.service";

@Module({
	controllers: [FieldController],
	providers: [FieldService, FieldRepository],
	exports: [FieldService],
})
export class FieldModule {}
