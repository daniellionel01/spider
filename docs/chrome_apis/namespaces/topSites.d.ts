// Chrome API namespace: topSites
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace topSites {
        /** An object encapsulating a most visited URL, such as the URLs on the new tab page. */
        export interface MostVisitedURL {
            /** The most visited URL. */
            url: string;
            /** The title of the page */
            title: string;
        }

        /** Gets a list of top sites. */
        export function get(callback: (data: MostVisitedURL[]) => void): void;

        /**
         * Gets a list of top sites.
         * @return The `get` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function get(): Promise<MostVisitedURL[]>;
    }
} // end of chrome namespace
