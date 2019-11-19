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
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    verifyEmail(email, key) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env.EMAIL_USER);
            let transporter = nodemailer_1.default.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            let global_url = `http://audago-zen.herokuapp.com/verify_signup/${email}$${key}`;
            let dev_url = `http://localhost:4000/verify_signup/${email}$${key}`;
            let info = yield transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>',
                to: 'example@example.com',
                subject: 'Subject ✔',
                text: 'Text?',
                html: `<a href=${global_url}>Verify Account</a>`
            });
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer_1.default.getTestMessageUrl(info));
            return nodemailer_1.default.getTestMessageUrl(info);
        });
    }
}
exports.default = EmailService;
//# sourceMappingURL=EmailService.js.map