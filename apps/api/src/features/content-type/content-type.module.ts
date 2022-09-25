import { Module } from "@nestjs/common";
import { ContentTypeService } from "./content-type.service";

@Module({
	imports: [],
	providers: [ContentTypeService],
	exports: [ContentTypeService],
})
export class ContentTypeModule {}
