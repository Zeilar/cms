import { ManyToOne, OneToMany, BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Space } from "../space/space.entity";
import { Field } from "../field/field.entity";

@Entity()
export class ContentType extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	public id: string;

	@Column({ type: "text", nullable: false })
	public name: string;

	@OneToMany(() => Field, field => field.type)
	public fields: Field[];

	@ManyToOne(() => Space, space => space.contentTypes, { nullable: false })
	public space: Space;
}
