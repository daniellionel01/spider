// Chrome API namespace: system.memory
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace system.memory {
        export interface MemoryInfo {
            /** The total amount of physical memory capacity, in bytes. */
            capacity: number;
            /** The amount of available capacity, in bytes. */
            availableCapacity: number;
        }

        /** Get physical memory information. */
        export function getInfo(callback: (info: MemoryInfo) => void): void;

        /**
         * Get physical memory information.
         * @return The `getInfo` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getInfo(): Promise<MemoryInfo>;
    }
} // end of chrome namespace
