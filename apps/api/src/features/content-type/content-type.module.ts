import { Module } from "@nestjs/common";
import { CacheModule } from "../cache/cache.module";
import { ContentTypeController } from "./content-type-controller";
import { ContentTypeRepository } from "./content-type.repository";
import { ContentTypeService } from "./content-type.service";

@Module({
	imports: [CacheModule],
	controllers: [ContentTypeController],
	providers: [ContentTypeService, ContentTypeRepository],
	exports: [ContentTypeService],
})
export class ContentTypeModule {}
