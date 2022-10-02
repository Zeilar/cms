import { Module } from "@nestjs/common";
import { CacheModule } from "../cache/cache.module";
import { FieldController } from "./field.controller";
import { FieldRepository } from "./field.repository";
import { FieldService } from "./field.service";

@Module({
	imports: [CacheModule],
	controllers: [FieldController],
	providers: [FieldService, FieldRepository],
	exports: [FieldService],
})
export class FieldModule {}
