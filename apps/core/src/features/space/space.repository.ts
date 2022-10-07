import { CreateSpaceDto } from "../../common/validators/space/CreateSpaceDto";
import { Injectable } from "@nestjs/common";
import { Space } from "./space.model";
import type { CountResult, ID } from "../../types/repository";
import { UpdateSpaceDto } from "../../common/validators/space/UpdateSpaceDto";

@Injectable()
export class SpaceRepository {
	public async count(): Promise<number> {
		const result = (await Space.query().count("id").first()) as unknown as CountResult;
		return parseInt(result.count);
	}

	public all(): Promise<Space[]> {
		return Space.query().execute();
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

	public edit(id: ID, dto: UpdateSpaceDto): Promise<Space> {
		return Space.query().updateAndFetchById(id, dto).execute();
	}
}
