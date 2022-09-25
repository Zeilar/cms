import { Injectable } from "@nestjs/common";
import { Space } from "./space.entity";

export interface SpaceDto {
	name: string;
}

@Injectable()
export class SpaceService {
	public async create(dto: SpaceDto) {
		const { identifiers } = await Space.insert(dto);
		return identifiers[0];
	}
}
