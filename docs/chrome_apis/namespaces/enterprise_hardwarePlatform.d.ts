// Chrome API namespace: enterprise.hardwarePlatform
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace enterprise.hardwarePlatform {
        export interface HardwarePlatformInfo {
            manufacturer: string;
            model: string;
        }

        /**
         * Obtains the manufacturer and model for the hardware platform and, if the extension is authorized, returns it via callback.
         * Can return its result via Promise in Manifest V3 or later since Chrome 96.
         */
        export function getHardwarePlatformInfo(): Promise<HardwarePlatformInfo>;
        export function getHardwarePlatformInfo(callback: (info: HardwarePlatformInfo) => void): void;
    }
} // end of chrome namespace
