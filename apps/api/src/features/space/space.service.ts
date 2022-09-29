import { CreateSpaceDto } from "../../common/validators/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { Space } from "./space.entity";

@Injectable()
export class SpaceService {
	public async create(dto: CreateSpaceDto) {
		const { identifiers } = await Space.insert(dto);
		return identifiers[0];
	}
}
