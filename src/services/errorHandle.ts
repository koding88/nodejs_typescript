import {
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
} from "@prisma/client/runtime/library";

class ErrorHandle {
    public handleError(error: unknown): { status: number; message: string } {
        const unexpectedError = {
            status: 500,
            message: "An unexpected error occurred",
        };

        if (error instanceof PrismaClientValidationError) {
            return {
                status: 400,
                message: error.message,
            };
        } else if (error instanceof PrismaClientKnownRequestError) {
            switch (error.code) {
                case "P2025":
                    return {
                        status: 404,
                        message: "Book not found",
                    };
                default:
                    return unexpectedError;
            }
        } else {
            return unexpectedError;
        }
    }
}

export default new ErrorHandle();
