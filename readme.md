# MachineId(`2`)
> Cross-platform unique machine (desktop) id discovery

This package is a refactored version of `node-machine-id` written in TypeScript

## Use cases
- Software restrictions
- Installation tracking
## Features
- Hardware independent
- Unique within the OS installation
- No elevated rights required
- No external dependencies and does not require any native bindings
-  Cross-platform (OSx, Win, Linux)

## Installation
```sh
npm install machine-id2

# or:
yarn add machine-id2
```

## Usage
```typescript
/**
 * This function gets the OS native UUID/GUID asynchronously (recommended), hashed by default.
 * 
 * @param useOriginal If true return original value of machine id, otherwise return hashed value (sha - 256)
 * @public
 */
export async function machineId(useOriginal?: boolean): Promise<string>;
```
## Example
```typescript
import { machineId } from 'machine-id2'

machineId().then(console.log)
```

## How it works
Module based on OS native UUID/GUID which used for internal needs.

**All others approaches requires elevated rights or much depends on hardware components, but this approach summarize the methods of selecting the most reliable unique identifier**

- `Win32/64` uses key `MachineGuid` in registry `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography` *(can be changed by administrator but with unpredictable consequences)*

> It is generated during OS installation and won't change unless you make another OS updates or reinstall. Depending on the OS version it may contain the network adapter MAC address embedded (plus some other numbers, including random), or a pseudorandom number.

- `Darwin` uses `IOPlatformUUID` (the same Hardware UUID) `ioreg -rd1 -c IOPlatformExpertDevice`
> Value from I/O Kit registry in IOPlatformExpertDevice class

- `Linux` uses `/var/lib/dbus/machine-id` *(can be changed by `root` but with unpredictable consequences)* http://man7.org/linux/man-pages/man5/machine-id.5.html
> The /var/lib/dbus/machine-id file contains the unique machine ID of the local system that is set during installation. The machine ID is a single newline-terminated, hexadecimal, 32-character, lowercase machine ID string. When decoded from hexadecimal, this corresponds with a 16-byte/128-bit string.

> The machine ID is usually generated from a random source during system installation and stays constant for all subsequent boots. Optionally, for stateless systems, it is generated during runtime at early boot if it is found to be empty.

> The machine ID does not change based on user configuration or when hardware is replaced.