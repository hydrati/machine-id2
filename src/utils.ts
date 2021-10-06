import { exec } from 'child_process'

import hasher from 'crypto-js/sha256'
import { enc } from 'crypto-js/core'

import { MachineIdError, CMD_ERROR_MSG } from './error'

export const execAsync = (cmd: string) => 
    new Promise<string>(
        (r, j) => exec(
            cmd,
            (e, s) => (e == null ? r(s.toString()) : j(e))
        )
    )

export async function execQuery(query: string): Promise<string> {
    let result
    try {
        result = await execAsync(query)
    } catch(e: any) {
        throw new MachineIdError(CMD_ERROR_MSG, e)
    }
    return result
}

export function formatStr(str: string) {
    return str.trim().replace(/r+|\n+|\s+/ig, '').toLowerCase()
}

export function hashId(id: string): string {
    return hasher(id).toString(enc.Hex)
}
