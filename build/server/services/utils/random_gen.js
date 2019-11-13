"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Random_key {
    generate(length) {
        var result = '';
        var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports.default = Random_key;
//# sourceMappingURL=random_gen.js.map