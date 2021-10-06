/*
  Source:
    - https://github.com/automation-stack/node-machine-id
*/

import { execQuery, formatStr } from '../utils'

const CMD_QUERY = 
  'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid'

export const query = async () => {
    const result = await execQuery(CMD_QUERY)
    return formatStr(result)
}
