import { Module, forwardRef } from "@nestjs/common";
import { ContentTypeModule } from "../content-type/content-type.module";
import { FieldController } from "./field.controller";
import { FieldRepository } from "./field.repository";
import { FieldService } from "./field.service";

@Module({
	imports: [forwardRef(() => ContentTypeModule)],
	controllers: [FieldController],
	providers: [FieldService, FieldRepository],
	exports: [FieldService],
})
export class FieldModule {}
