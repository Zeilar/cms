import { Injectable } from "@nestjs/common";
import { Space } from "./space.entity";

export interface SpaceDto {
	name: string;
}

@Injectable()
export class SpaceService {
	public create(dto: SpaceDto) {
		Space.insert(dto);
	}
}
