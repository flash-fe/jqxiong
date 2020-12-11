"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 单独打包lodash部分代码
var isType_1 = __importDefault(require("../utils/isType"));
var isDate = function (str) { return isType_1.default(str, 'Date'); };
exports.default = isDate;
