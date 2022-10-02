import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { SpaceModule } from "../features/space/space.module";
import { ContentTypeModule } from "../features/content-type/content-type.module";
import { FieldModule } from "../features/field/field.module";
import { CacheModule } from "../features/cache/cache.module";

@Module({
	imports: [ConfigModule, CacheModule, FieldModule, ContentTypeModule, SpaceModule],
})
export class CoreModule {}
