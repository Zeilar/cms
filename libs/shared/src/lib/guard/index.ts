import { Role } from "../types";

export enum Action {
	CREATE_RESOURCE = "createResource",
	EDIT_RESOURCE = "editResource",
	DELETE_RESOURCE = "deleteResource",
}

export class Guard {
	private static permissions: Record<Role, Action[]> = {
		[Role.ADMIN]: [Action.CREATE_RESOURCE],
		[Role.EDITOR]: [Action.CREATE_RESOURCE],
	};

	public static can(roles: Role[], action: Action) {
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
