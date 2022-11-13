export default class Routes {
	public constructor(private spaceName = "", private contentTypeName = "") {}

	public space(spaceName?: string): string {
		return `/space/${spaceName ?? this.spaceName}`;
	}

	public contentTypes(): string {
		return `${this.space()}/content-types`;
	}

	public contentType(contentTypeName?: string): string {
		return `${this.contentTypes()}/${contentTypeName ?? this.contentTypeName}`;
	}

	public fields(): string {
		return `${this.contentType()}/fields`;
	}

	public entries(): string {
		return `${this.space()}/entries`;
	}
}
