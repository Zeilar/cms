import { CreateSpaceDto } from "../../common/validators/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { Space } from "./space.model";
import type { CountResult, ID } from "../../types/repository";

@Injectable()
export class SpaceRepository {
	public async count(): Promise<number> {
		const [result] = (await Space.query().count("id")) as unknown as CountResult;
		return parseInt(result.count);
	}

	public findById(id: ID): Promise<Space | undefined> {
		return Space.query().findById(id).execute();
	}

	public create(space: CreateSpaceDto): Promise<Space> {
		return Space.query().insertAndFetch(space).execute();
	}

	public destroy(id: ID): Promise<number> {
		return Space.query().deleteById(id).execute();
	}
}
