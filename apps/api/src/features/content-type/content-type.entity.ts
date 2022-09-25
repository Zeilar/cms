import { ManyToOne, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Space } from "../space/space.entity";

@Entity()
export class ContentType extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column()
	public name: string;

	@ManyToOne(() => Space, space => space.contentTypes)
	public space: Space;
}
