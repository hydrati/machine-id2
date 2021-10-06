/*
  Source:
    - https://github.com/automation-stack/node-machine-id
*/

import { execQuery }from '../utils'

const CMD_QUERY = 'ioreg -rd1 -c IOPlatformExpertDevice'

export const query = async () => {
    const result = await execQuery(CMD_QUERY)
    return result
        .split('IOPlatformUUID')[1]
        .split('\n')[0]
        .replace(/=|\s+|"/ig, '')
        .toLowerCase()
        .trim()
}
