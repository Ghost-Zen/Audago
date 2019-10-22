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
const AccountSchema = new mongoose_1.Schema({
    "firstName": { "type": String, "required": true, "unique": false },
    "lastName": { "type": String, "required": true, "unique": false },
    "username": { "type": String, "required": true, "unique": true },
    "password": { "type": String, "required": true, "bcrypt": true },
    "email": { "type": String, "required": true, "unique": true },
    "image": { "type": String, "required": false },
    "active": { "type": Boolean, "required": true },
    "timestamp": {
        "created": { "type": String, "required": true, "unique": false },
        "lastSeen": { "type": String, "required": true, "unique": false },
    },
    "playlists": { "type": [String], "required": false, "unique": false }
});
exports.default = mongoose_1.default.model('Accounts', AccountSchema);
// sample data for this schema
// {
//     firstName: 'Dyllan',
//     lastName: 'Hope',
//     username: 'dyllanhope123',
//     password: '12345',
//     email: 'dyllanjhope@gmail.com',
//     image: '',
//     active: true,
//     timestamp: {
//         created: 'date',
//         lastSeen: 'date'
//     },
//     playlists: ['trance','chill','rap']
// }
//# sourceMappingURL=Accounts.js.map