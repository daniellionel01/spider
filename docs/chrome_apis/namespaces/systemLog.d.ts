// Chrome API namespace: systemLog
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace systemLog {
        export interface MessageOptions {
            message: string;
        }

        /**
         * Adds a new log record.
         * Can return its result via Promise in Manifest V3 or later.
         */
        export function add(options: MessageOptions): Promise<void>;
        export function add(options: MessageOptions, callback: () => void): void;
    }
} // end of chrome namespace
