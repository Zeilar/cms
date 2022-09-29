interface Breadcrumb {
	label: string;
	href?: string;
}

export default class UrlBuilder {
	public static space(name: string) {
		return `/space/${name.toLowerCase()}`;
	}

	public static contentType(name: string) {
		return `/contentType/${name.toLowerCase()}`;
	}

	public static field(name: string) {
		return `/field/${name.toLowerCase()}`;
	}

	public static entry(name: string) {
		return `/entry${name.toLowerCase()}`;
	}

	public static url(spaceName = "", contentTypeName = "", fieldName = "", entryName = "") {
		return `${this.space(spaceName)}${this.contentType(contentTypeName)}${this.field(
			fieldName
		)}${this.entry(entryName)}`;
	}

	public static breadcrumbs(
		spaceName = "",
		contentTypeName = "",
		fieldName = "",
		entryName = ""
	) {
		const breadcrumbs: Breadcrumb[] = [{ label: "Home", href: "/" }];
		if (spaceName.length > 0) {
			breadcrumbs.push({ label: spaceName, href: this.space(spaceName) });
		}
		if (contentTypeName.length > 0) {
			breadcrumbs.push({
				label: contentTypeName,
				href: this.url(spaceName, contentTypeName),
			});
		}
		if (fieldName.length > 0) {
			breadcrumbs.push({
				label: fieldName,
				href: this.url(spaceName, contentTypeName, fieldName),
			});
		}
		if (entryName.length > 0) {
			breadcrumbs.push({
				label: entryName,
				href: this.url(spaceName, contentTypeName, fieldName, entryName),
			});
		}
		return breadcrumbs;
	}
}
