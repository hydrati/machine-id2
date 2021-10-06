import { command } from 'execa'

import hasher from 'crypto-js/sha256'
import { enc } from 'crypto-js/core'

import { MachineIdError, CMD_ERROR_MSG } from './error'

export async function execQuery(query: string): Promise<string> {
    let result
    try {
        result = await command(query)
    } catch(e: any) {
        throw new MachineIdError(CMD_ERROR_MSG, e)
    }
    if (result.failed) throw new MachineIdError(CMD_ERROR_MSG)
    else return result.stdout.toString()
}

export function formatStr(str: string) {
    return str.trim().replace(/r+|\n+|\s+/ig, '').toLowerCase()
}

export function hashId(id: string): string {
    return hasher(id).toString(enc.Hex)
}
