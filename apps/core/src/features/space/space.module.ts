import { Module } from "@nestjs/common";
import { ContentTypeModule } from "../content-type/content-type.module";
import { SpaceController } from "./space.controller";
import { SpaceRepository } from "./space.repository";
import { SpaceService } from "./space.service";

@Module({
	imports: [ContentTypeModule],
	controllers: [SpaceController],
	providers: [SpaceService, SpaceRepository],
	exports: [SpaceService, SpaceRepository],
})
export class SpaceModule {}
