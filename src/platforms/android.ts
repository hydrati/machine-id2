/* 
  Source: 
    - https://github.com/automation-stack/node-machine-id/pull/53
    - https://github.com/mooring/node-machine-id
*/

import { execQuery, formatStr } from '../utils'

const CMD_QUERY = 
  'a=`getprop ro.boot.vbmeta.digest` && b=`getprop ro.build.display.id` && [ -z $a ] && echo $b || echo $a|tr " " "-"'

export const query = async () => {
    const result = await execQuery(CMD_QUERY)
    return formatStr(result)
}
