import { CreateFieldDto } from "@api/common/validators/CreateFieldDto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ContentType } from "../content-type/content-type.entity";
import { Field } from "./field.entity";

@Injectable()
export class FieldService {
	public async create({ contentTypeId, ...dto }: CreateFieldDto) {
		const contentType = await ContentType.findOneBy({ id: contentTypeId });
		if (!contentType) {
			throw new NotFoundException("ContentType not found");
		}
		const { identifiers } = await Field.insert({ ...dto, contentType });
		return identifiers[0];
	}
}
