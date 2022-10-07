import { Module } from "@nestjs/common";
import { FieldModule } from "../field/field.module";
import { ContentTypeController } from "./content-type-controller";
import { ContentTypeRepository } from "./content-type.repository";
import { ContentTypeService } from "./content-type.service";

@Module({
	imports: [FieldModule],
	controllers: [ContentTypeController],
	providers: [ContentTypeService, ContentTypeRepository],
	exports: [ContentTypeService],
})
export class ContentTypeModule {}
