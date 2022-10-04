import { Module } from "@nestjs/common";
import { ContentTypeController } from "./content-type-controller";
import { ContentTypeRepository } from "./content-type.repository";
import { ContentTypeService } from "./content-type.service";

@Module({
	controllers: [ContentTypeController],
	providers: [ContentTypeService, ContentTypeRepository],
	exports: [ContentTypeService],
})
export class ContentTypeModule {}
