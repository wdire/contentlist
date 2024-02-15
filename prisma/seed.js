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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_1 = require("@/lib/prisma");
var nextjs_1 = require("@clerk/nextjs");
var createTestUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Start creating test user");
                return [4 /*yield*/, nextjs_1.clerkClient.users.createUser({
                        username: "test",
                        emailAddress: ["ozturkiramazan@gmail.com"],
                        password: "123456789",
                    })];
            case 1:
                response = _a.sent();
                console.log("Created test user", response);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("Error creating user", err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var listData = [
    {
        name: "Animess",
        user: {
            connect: {
                id: "1",
            },
        },
        contentsData: {
            rows: [
                {
                    name: "S",
                    row_id: "S",
                    color: "red",
                    contents: [
                        {
                            name: "One Piece",
                            source: "TMDB",
                            image_url: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
                        },
                        {
                            name: "Hunter X Hunter",
                            source: "TMDB",
                            image_url: "https://image.tmdb.org/t/p/w500/ucpgmUR1h5Te1BYegKItoPjOeF7.jpg",
                        },
                    ],
                },
                {
                    name: "A",
                    row_id: "A",
                    color: "blue",
                    contents: [
                        {
                            name: "One Punch Man",
                            source: "TMDB",
                            image_url: "https://image.tmdb.org/t/p/w500/bS6GeCRInMRl6oQN6czCqPFdcHN.jpg",
                        },
                        {
                            name: "Death Note",
                            source: "TMDB",
                            image_url: "https://image.tmdb.org/t/p/w500/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg",
                        },
                        {
                            name: "Attack on Titan",
                            source: "TMDB",
                            image_url: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
                        },
                    ],
                },
                {
                    name: "B",
                    color: "green",
                    row_id: "B",
                    contents: [],
                },
            ],
            storage: [],
        },
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Start seeding ...");
                    createTestUser();
                    return [4 /*yield*/, Promise.all(listData.map(function (l) { return __awaiter(_this, void 0, void 0, function () {
                            var list;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, prisma_1.default.list.upsert({
                                            where: {
                                                id: 1,
                                            },
                                            create: l,
                                            update: l,
                                        })];
                                    case 1:
                                        list = _a.sent();
                                        console.log("Created list with name: ".concat(list.name));
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    console.log("Seeding finished.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.default.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
