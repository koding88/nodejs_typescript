"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookSchema = exports.CreateBookSchema = void 0;
const zod_1 = require("zod");
exports.CreateBookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    published: zod_1.z.boolean(),
});
exports.UpdateBookSchema = zod_1.z.object({
    title: zod_1.z.string().nullable(),
    author: zod_1.z.string().nullable(),
    published: zod_1.z.boolean().nullable(),
});
