import { CreateSpaceDto } from "../../common/validators/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { Space } from "./space.model";
import type { ID } from "../../types/repository";

@Injectable()
export class SpaceRepository {
	public findById(id: ID): Promise<Space | undefined> {
		return Space.query().findById(id).execute();
	}

	public create(space: CreateSpaceDto): Promise<Space> {
		return Space.query().insertAndFetch(space).execute();
	}
}
