import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FieldType } from "@shared";
import { ContentType } from "../content-type/content-type.entity";

@Entity()
export class Field extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column({ type: "text", nullable: false })
	public name: string;

	@Column({ type: "enum", enum: FieldType, nullable: false })
	public type: FieldType;

	@ManyToOne(() => ContentType, contentType => contentType.fields)
	public contentType: ContentType;
}
