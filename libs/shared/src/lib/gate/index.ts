import { Role } from "../types";

export enum Action {
	CREATE_RESOURCE = "createResource",
	EDIT_RESOURCE = "editResource",
	DELETE_RESOURCE = "deleteResource",
	CREATE_REGISTER_TOKEN = "createRegisterToken",
}

const actions = Object.values(Action);

export class Gate {
	private static permissions: Record<Role, Action[]> = {
		[Role.ADMIN]: actions, // Admin has access to everything
		[Role.EDITOR]: [Action.CREATE_RESOURCE, Action.EDIT_RESOURCE, Action.DELETE_RESOURCE],
	};

	public static can(roles: Role[], action: Action): boolean {
		let authorized = false;
		for (const role of roles) {
			if (this.permissions[role].includes(action)) {
				authorized = true;
				break;
			}
		}
		return authorized;
	}
}
