import { Module } from "@nestjs/common";
import { CacheModule } from "../cache/cache.module";
import { SpaceController } from "./space.controller";
import { SpaceRepository } from "./space.repository";
import { SpaceService } from "./space.service";

@Module({
	imports: [CacheModule],
	controllers: [SpaceController],
	providers: [SpaceService, SpaceRepository],
	exports: [SpaceService],
})
export class SpaceModule {}
