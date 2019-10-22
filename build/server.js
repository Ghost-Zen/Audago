"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.use(express_1.default.static('./client/build'));
const PORT = process.env.PORT || 4732;
app.listen(PORT, function () {
    console.log(`App starting on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map