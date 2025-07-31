// Chrome API namespace: pageCapture
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace pageCapture {
        export interface SaveDetails {
            /** The id of the tab to save as MHTML. */
            tabId: number;
        }

        /**
         * Saves the content of the tab with given id as MHTML.
         * @param callback Called when the MHTML has been generated.
         * Parameter mhtmlData: The MHTML data as a Blob.
         */
        export function saveAsMHTML(details: SaveDetails, callback: (mhtmlData?: Blob) => void): void;
        /**
         * Saves the content of the tab with given id as MHTML.
         * @since Chrome 116 MV3
         */
        export function saveAsMHTML(details: SaveDetails): Promise<Blob | undefined>;
    }
} // end of chrome namespace
