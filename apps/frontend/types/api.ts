export interface ApiError {
	status: number;
	message: string;
}

export interface ApiResponse<T = unknown, IsSuccess = false> {
	data: IsSuccess extends true ? T : undefined;
	error: IsSuccess extends false ? ApiError : undefined;
}
