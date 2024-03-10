import { SerializedError } from "@reduxjs/toolkit";
import { ErrorResponse } from "./rootAPI";

export const extractError = (
	errorResponse: ErrorResponse | SerializedError
) => {
	return "data" in errorResponse ? errorResponse.data.message : undefined;
};
