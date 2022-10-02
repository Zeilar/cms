import { CreateFieldDto } from "../../common/validators/CreateFieldDto";
import { Injectable } from "@nestjs/common";
import { CacheService } from "../cache/cache.service";
import { Field } from "./field.model";
import { FieldRepository } from "./field.repository";
import type { ID } from "../../types/repository";

@Injectable()
export class FieldService {
	public constructor(
		private readonly cacheService: CacheService,
		private readonly fieldRepository: FieldRepository
	) {}

	public async create(dto: CreateFieldDto): Promise<Field> {
		const field = await this.fieldRepository.create(dto);
		await this.cacheService.set(`field-${field.id}`, field);
		return field;
	}

	public async findById(id: ID): Promise<Field | undefined> {
		const cached = await this.cacheService.get<Field>(`field-${id}`);
		if (cached != null) {
			return cached;
		}
		return this.fieldRepository.findById(id);
	}
}
