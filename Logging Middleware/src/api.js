"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function wrap(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function handleSuccess(value) { try { advance(generator.next(value)); } catch (err) { reject(err); } }
        function handleError(value) { try { advance(generator.throw(value)); } catch (err) { reject(err); } }
        function advance(result) {
            result.done ? resolve(result.value) : wrap(result.value).then(handleSuccess, handleError);
        }
        advance((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.recordLog = recordLog;

const axios_1 = __importDefault(require("axios"));
const authUtils_1 = require("./auth");

function recordLog(logData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authToken = yield (0, authUtils_1.getAuthToken)();
            const result = yield axios_1.default.post(
                "http://20.244.56.144/evaluation-service/logs",
                logData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            // For debugging purposes only - remove or comment out in production
            // console.log("Log successfully sent:", result.data);
        } catch (err) {
            console.error("Error while sending log:", err);
        }
    });
}
