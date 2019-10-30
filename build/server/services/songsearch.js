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
const axios_1 = __importDefault(require("axios"));
class SearchSong {
    constructor() {
        this.getFromItunesAPI = (e) => __awaiter(this, void 0, void 0, function* () {
            let allSongsBySearch = [];
            yield axios_1.default
                .get(`https://itunes.apple.com/search?term=${e.search}&entity=song`)
                .then(function (response) {
                let data = response.data.results;
                for (let item of data) {
                    // if(item.kind === 'song'){
                    allSongsBySearch.push(item);
                    // }
                }
            });
            //  let result = allSongsBySearch)
            console.log(allSongsBySearch);
            return allSongsBySearch;
        });
    }
}
exports.default = SearchSong;
//# sourceMappingURL=songsearch.js.map