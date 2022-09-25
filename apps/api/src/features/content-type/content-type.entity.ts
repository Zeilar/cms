import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Space } from "../space/space.entity";
import { ContentTypeModel } from "@shared";

@Entity()
export class ContentType extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column({ type: "text", nullable: false })
	public name: string;

	@Column({ type: "enum", enum: ContentTypeModel, nullable: false })
	public model: ContentTypeModel;

	@ManyToOne(() => Space, space => space.contentTypes, { nullable: false })
	public space: Space;
}
