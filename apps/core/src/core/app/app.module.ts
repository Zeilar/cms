import { Module } from "@nestjs/common";
import { ConfigModule } from "../../config/config.module";
import { SpaceModule } from "../../features/space/space.module";
import { ContentTypeModule } from "../../features/content-type/content-type.module";
import { FieldModule } from "../../features/field/field.module";
import { UserModule } from "../../features/user/user.module";
import { AuthModule } from "../../features/auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";
import { EntryModule } from "../../features/entry/entry.module";

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule,
		EntryModule,
		FieldModule,
		ContentTypeModule,
		SpaceModule,
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
