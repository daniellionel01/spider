// Chrome API namespace: search
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace search {
        export type Disposition = "CURRENT_TAB" | "NEW_TAB" | "NEW_WINDOW";

        export interface QueryInfo {
            /** Location where search results should be displayed. CURRENT_TAB is the default.  */
            disposition?: Disposition | undefined;
            /** Location where search results should be displayed. tabIdcannot be used with disposition. */
            tabId?: number | undefined;
            /** String to query with the default search provider. */
            text?: string | undefined;
        }

        /**
         * Used to query the default search provider. In case of an error, runtime.lastError will be set.
         * @param options search configuration options.
         */
        export function query(options: QueryInfo, callback: () => void): void;

        /**
         * Used to query the default search provider. In case of an error, runtime.lastError will be set.
         * @param options search configuration options.
         * @return The `query` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function query(options: QueryInfo): Promise<void>;
    }
} // end of chrome namespace
