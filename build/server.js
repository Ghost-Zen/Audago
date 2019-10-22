"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./server/routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('./client/build'));
const appRouting = new routes_1.default(app);
appRouting.router();
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log(`App starting on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map