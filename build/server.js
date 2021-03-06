"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./server/routes/routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static('./client/build'));
const url = process.env.MONGODB_URI;
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }); // establishing the connection
mongoose_1.default.connection
    .once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connection established');
    const appRouting = new routes_1.default(app);
    appRouting.router();
}))
    .on('error', (error) => {
    console.log('Warning : ' + error);
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
    console.log(`App starting on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map