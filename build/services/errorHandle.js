"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
class ErrorHandle {
    handleError(error) {
        const unexpectedError = {
            status: 500,
            message: "An unexpected error occurred",
        };
        if (error instanceof library_1.PrismaClientValidationError) {
            return {
                status: 400,
                message: error.message,
            };
        }
        else if (error instanceof library_1.PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    return {
                        status: 404,
                        message: "Book not found",
                    };
                default:
                    return unexpectedError;
            }
        }
        else {
            return unexpectedError;
        }
    }
}
exports.default = new ErrorHandle();
