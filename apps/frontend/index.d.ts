/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
	interface StaticImageData {
		src: string;
		width: number;
		height: number;
	}
	const content: StaticImageData;
	export const ReactComponent: any;
	export default content;
}
