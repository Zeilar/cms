export interface ApiError {
	status: number;
	message: string;
}

export interface ApiResponse<T = unknown> {
	data: T;
	error: ApiError;
}
