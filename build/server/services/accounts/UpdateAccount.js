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
const Accounts_1 = __importDefault(require("../models/Accounts"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UpdateAccount {
    constructor() {
        this.updatePicture = (username, image) => __awaiter(this, void 0, void 0, function* () {
            yield Accounts_1.default.updateOne({ username }, { image: image.filename });
        });
    }
    update(username, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Accounts_1.default.findOne({ username })
                .then(res => {
                for (const item in updateData) {
                    if (!updateData[item]) {
                        updateData[item] = res[item];
                    }
                }
            });
            yield Accounts_1.default.updateOne({ username }, { firstName: updateData.firstName, lastName: updateData.lastName, email: updateData.email });
            return { response: `Account updated successfully!`, status: true };
        });
    }
    updatePassword(username, currentPass, newPass, testPass) {
        return __awaiter(this, void 0, void 0, function* () {
            let strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            let password = '';
            let found = false;
            let matched = false;
            if (testPass === newPass) {
                if (strongPassRegex.test(newPass)) {
                    yield Accounts_1.default.findOne({ username })
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        if (res) {
                            found = true;
                            const match = yield bcrypt_1.default.compare(currentPass, res.password);
                            if (match) {
                                matched = true;
                                yield bcrypt_1.default.hash(newPass, 10).then(function (hash) {
                                    password = hash;
                                });
                                yield Accounts_1.default.updateOne({ username }, { password });
                            }
                        }
                    }));
                }
                else {
                    return { response: 'The entered password is too weak', status: false };
                }
            }
            else {
                return { response: 'Your New and Confirmation passwords do not match', status: false };
            }
            if (!found) {
                return { response: `Username ${username} not found`, status: false };
            }
            else if (!matched) {
                return { response: `Password incorrect`, status: false };
            }
            else {
                return { response: `Password updated`, status: true };
            }
        });
    }
}
exports.default = UpdateAccount;
//# sourceMappingURL=UpdateAccount.js.map