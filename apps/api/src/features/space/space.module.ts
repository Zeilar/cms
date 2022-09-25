import { Module } from "@nestjs/common";
import { SpaceService } from "./space.service";

@Module({
	imports: [],
	providers: [SpaceService],
	exports: [SpaceService],
})
export class SpaceModule {}
