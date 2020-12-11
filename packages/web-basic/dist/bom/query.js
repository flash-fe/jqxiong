"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyQuery = exports.resolveQuery = void 0;
// copied from vue-router
var isInBrowser_1 = __importDefault(require("../utils/isInBrowser"));
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;
// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ','); };
var decode = decodeURIComponent;
function resolveQuery(query, extraQuery, selfParseQuery) {
    var parse = selfParseQuery || parseQuery;
    var parsedQuery;
    try {
        parsedQuery = parse(query || '');
    }
    catch (e) {
        // 兼容node server
        if (process.env.NODE_ENV !== 'production') {
            console.warn(false, e.message);
        }
        parsedQuery = {};
    }
    for (var key in extraQuery) {
        if (extraQuery[key]) {
            parsedQuery[key] = extraQuery[key];
        }
    }
    return parsedQuery;
}
exports.resolveQuery = resolveQuery;
function parseQuery(query) {
    var res = {};
    query = query.trim().replace(/^(\?|#|&)/, '');
    if (!query) {
        return res;
    }
    query.split('&').forEach(function (param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        var key = decode(parts.shift());
        var val = parts.length > 0
            ? decode(parts.join('='))
            : null;
        if (res[key] === undefined) {
            res[key] = val;
        }
        else if (Array.isArray(res[key])) {
            res[key].push(val);
        }
        else {
            res[key] = [res[key], val];
        }
    });
    return res;
}
function stringifyQuery(obj) {
    var res = obj ? Object.keys(obj).map(function (key) {
        var val = obj[key];
        if (val === undefined) {
            return '';
        }
        if (val === null) {
            return encode(key);
        }
        if (Array.isArray(val)) {
            var result_1 = [];
            val.forEach(function (val2) {
                if (val2 === undefined) {
                    return;
                }
                if (val2 === null) {
                    result_1.push(encode(key));
                }
                else {
                    result_1.push(encode(key) + '=' + encode(val2));
                }
            });
            return result_1.join('&');
        }
        return encode(key) + '=' + encode(val);
    }).filter(function (x) { return x.length > 0; }).join('&') : null;
    return res ? "?" + res : '';
}
exports.stringifyQuery = stringifyQuery;
// client only
var getQuery = function (key, url) {
    if (key === void 0) { key = ''; }
    if (url === void 0) { url = ''; }
    var searchStr = url || isInBrowser_1.default ? window.location.search : '';
    var parsedQuery = resolveQuery(searchStr);
    var queryObj = parsedQuery || {};
    if (key) {
        return queryObj[key] || '';
    }
    return queryObj;
};
exports.default = getQuery;
