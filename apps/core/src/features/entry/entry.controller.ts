import { CreateEntryDto } from "../../common/validators/entry/CreateEntryDto";
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Query,
} from "@nestjs/common";
import { EntryService } from "./entry.service";
import type { ID } from "../../types/repository";
import { Entry } from "./entry.model";

@Controller("/entry")
export class EntryController {
	public constructor(public readonly entryService: EntryService) {}

	@Post("/")
	public create(@Body() dto: CreateEntryDto): Promise<Entry> {
		return this.entryService.create(dto);
	}

	@Get("/")
	public async findBySpaceName(@Query("spaceName") spaceName?: string): Promise<Entry[]> {
		if (typeof spaceName !== "string") {
			throw new BadRequestException("Missing spaceName query parameter.");
		}
		return this.entryService.findBySpaceName(spaceName);
	}

	@Get("/:id")
	public async findById(@Param("id") id: ID): Promise<Entry> {
		const entry = await this.entryService.findById(id);
		if (!entry) {
			throw new NotFoundException("Entry not found.");
		}
		return entry;
	}
}
