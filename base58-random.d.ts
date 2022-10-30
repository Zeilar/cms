declare module "base58-random" {
	export function generateBase58Math(): string;
	export function generateBase58Node(): string;
	export function generateBase58Browser(): string;

	export function initMath(): void;
	export function initNode(): void;
	export function initBrowser(): void;

	export function test(str: string): boolean;

	export default function base58(length: number): string;
}
