import { CreateContentTypeDto } from "../../core/common/validators/content-type/CreateContentTypeDto";
import { Injectable } from "@nestjs/common";
import type { ID } from "../../types/repository";
import { ContentType } from "./content-type.model";

@Injectable()
export class ContentTypeRepository {
	public findById(id: ID): Promise<ContentType | undefined> {
		return ContentType.query().findById(id).execute();
	}

	public create(contentType: CreateContentTypeDto): Promise<ContentType> {
		return ContentType.query().insertAndFetch(contentType).execute();
	}

	public getAllInSpace(spaceId: ID): Promise<ContentType[]> {
		return ContentType.query().where({ spaceId }).execute();
	}
}
