import { platform } from 'os'
import { hashId } from './utils'
import { MachineIdError, UNSUPPORTED_PLATFORM } from './error'

interface IPlatformQuery {
  query(): Promise<string>;
}

const SUPPORTED_PLATFORMS: 
  Record<NodeJS.Platform, (() => Promise<IPlatformQuery>)|undefined> = {
      win32: () => import('./platforms/win32'),
      darwin: () => import('./platforms/darwin'),
      android: () => import('./platforms/android'),
      freebsd: () => import('./platforms/freebsd'),
      linux: () => import('./platforms/linux'),
      aix: undefined,
      haiku: undefined,
      openbsd: undefined,
      sunos: undefined,
      cygwin: undefined,
      netbsd: undefined
  }


/**
 * This function gets the OS native UUID/GUID asynchronously (recommended), hashed by default.
 * 
 * @param useOriginal If true return original value of machine id, otherwise return hashed value (sha - 256)
 * @public
 */
export async function machineId(useOriginal = false): Promise<string> {
    const pf = platform()

    if (
        typeof SUPPORTED_PLATFORMS[pf] !== 'function'
    ) throw new MachineIdError(UNSUPPORTED_PLATFORM)

    const { query } = await SUPPORTED_PLATFORMS[pf]!()

    const originalId = await query()
    if (useOriginal) return originalId
    else return hashId(originalId)
}
