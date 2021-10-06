/*
  Source:
    - https://github.com/automation-stack/node-machine-id
*/

import { execQuery, formatStr } from '../utils'

const CMD_QUERY = 
  '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :'

export const query = async (): Promise<string> => {
    const result = await execQuery(CMD_QUERY)
    return formatStr(result)
}
