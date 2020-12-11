// copied from vue-router
import isInBrowser from '../utils/isInBrowser'

const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
const encode = (str: any) => encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ',')

const decode = decodeURIComponent

export function resolveQuery(
    query: any,
    extraQuery?: any,
    selfParseQuery?: any
) {
    const parse = selfParseQuery || parseQuery
    let parsedQuery
    try {
        parsedQuery = parse(query || '')
    } catch (e) {
        // 兼容node server
        if (process.env.NODE_ENV !== 'production') {
            console.warn(false, e.message)
        }
        parsedQuery = {}
    }
    for (const key in extraQuery) {
        if (extraQuery[key]) {
            parsedQuery[key] = extraQuery[key]
        }
    }
    return parsedQuery
}

interface IRes {
    [propNm: string]: string | string[] | null;
}

function parseQuery(query: any) {
    const res: IRes = {}

    query = query.trim().replace(/^(\?|#|&)/, '')
    if (!query) {
        return res
    }

    query.split('&').forEach((param: any) => {
        const parts = param.replace(/\+/g, ' ').split('=')
        const key = decode(parts.shift())
        const val = parts.length > 0
            ? decode(parts.join('='))
            : null

        if (res[key] === undefined) {
            res[key] = val
        } else if (Array.isArray(res[key])) {
            (res[key] as string[]).push(val as string)
        } else {
            (res[key] as string[]) = [res[key] as string, val as string]
        }
    })

    return res
}

export function stringifyQuery(obj: any) {
    const res = obj ? Object.keys(obj).map(key => {
        const val = obj[key]

        if (val === undefined) {
            return ''
        }

        if (val === null) {
            return encode(key)
        }

        if (Array.isArray(val)) {
            const result: string[] = [];
            val.forEach(val2 => {
                if (val2 === undefined) {
                    return
                }
                if (val2 === null) {
                    result.push(encode(key))
                } else {
                    result.push(encode(key) + '=' + encode(val2))
                }
            })
            return result.join('&')
        }

        return encode(key) + '=' + encode(val)
    }).filter(x => x.length > 0).join('&') : null
    return res ? `?${res}` : ''
}

// client only
const getQuery = (key = '', url = '') => {
    const searchStr = url || isInBrowser ? window.location.search : '';
    const parsedQuery = resolveQuery(searchStr);
    const queryObj = parsedQuery || {};
    if (key) {
        return queryObj[key] || ''
    }
    return queryObj
}

export default getQuery