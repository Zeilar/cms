import { Injectable } from "@nestjs/common";
import { Space } from "./space.entity";

export interface SpaceDto {
	name: string;
}

@Injectable()
export class SpaceService {
	public create(space: SpaceDto) {
		Space.insert(space);
	}
}
