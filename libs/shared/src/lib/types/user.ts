import { Timestamps } from "./repository";

export interface UserDto extends Timestamps {
	id: string;
	name: string;
	email: string;
}
