"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// linking table between 2 usernames
const FriendSchema = new mongoose_1.Schema({
    "requester": { "type": String, "required": true, "unique": false },
    "receiver": { "type": String, "required": true, "unique": false },
    "confirmed": { "type": Boolean, "require": true, "unique": false }
});
exports.default = mongoose_1.default.model('Friends', FriendSchema);
//# sourceMappingURL=Friends.js.map