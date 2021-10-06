export const REG_NOT_FOUND_ERROR_MSG = 'Not found the key or Can\'t Access the registry'
export const CMD_ERROR_MSG = 'Command Error'
export const UNSUPPORTED_PLATFORM = 'Unsupported platform'

export class MachineIdError extends Error {
    constructor(message?: string, public originalError?: Error) {
        super('Get Machine Id Error! ' + message)
    }
}
