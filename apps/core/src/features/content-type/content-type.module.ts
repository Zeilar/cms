import { Module, forwardRef } from "@nestjs/common";
import { FieldModule } from "../field/field.module";
import { SpaceModule } from "../space/space.module";
import { ContentTypeController } from "./content-type.controller";
import { ContentTypeRepository } from "./content-type.repository";
import { ContentTypeService } from "./content-type.service";

@Module({
	imports: [FieldModule, forwardRef(() => SpaceModule)],
	controllers: [ContentTypeController],
	providers: [ContentTypeService, ContentTypeRepository],
	exports: [ContentTypeService],
})
export class ContentTypeModule {}
