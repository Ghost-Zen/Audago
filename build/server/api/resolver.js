"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query = {
    hello: () => 'Hello World',
    test: () => 'Test Success, GraphQL server is up & running !!',
    createAccount: (input) => {
        console.log(input),
            `respone=>${input}`;
    }
};
exports.default = Query;
//# sourceMappingURL=resolver.js.map