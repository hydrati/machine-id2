/*
  Source:
    - https://github.com/automation-stack/node-machine-id/pull/57
    - https://github.com/Nokel81/node-machine-id/tree/no-regexe
*/

import { getValue, HKLM } from 'native-reg'
import { formatStr } from '../utils'
import { MachineIdError, REG_NOT_FOUND_ERROR_MSG } from '../error'


export const query = async () => {
    let val: string | undefined
    try {
        val = getValue(
            HKLM, 
            'SOFTWARE\\Microsoft\\Cryptography', 
            'MachineGuid'
        )?.toString()
    } catch(e: any) {
        throw new MachineIdError(REG_NOT_FOUND_ERROR_MSG, e)
    }

    if (val == null) throw new MachineIdError(REG_NOT_FOUND_ERROR_MSG)
    else return formatStr(val) 
}
