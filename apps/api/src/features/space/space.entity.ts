import { OneToMany, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ContentType } from "../content-type/content-type.entity";

@Entity()
export class Space extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@OneToMany(() => ContentType, contentType => contentType.space)
	public contentTypes: ContentType[];
}
