"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
// ... your REST API routes will go here
app.listen(3000, function () {
    return console.log('REST API server ready at: http://localhost:3000');
});
//# sourceMappingURL=index.js.map