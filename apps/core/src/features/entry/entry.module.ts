import { Module } from "@nestjs/common";
import { ContentTypeModule } from "../content-type/content-type.module";
import { SpaceModule } from "../space/space.module";
import { EntryController } from "./entry.controller";
import { EntryRepository } from "./entry.repository";
import { EntryService } from "./entry.service";

@Module({
	imports: [SpaceModule, ContentTypeModule],
	controllers: [EntryController],
	providers: [EntryService, EntryRepository],
	exports: [EntryService],
})
export class EntryModule {}
