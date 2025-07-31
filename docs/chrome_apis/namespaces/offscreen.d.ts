// Chrome API namespace: offscreen
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace offscreen {
        /** The reason(s) the extension is creating the offscreen document. */
        export enum Reason {
            /** A reason used for testing purposes only. */
            TESTING = "TESTING",
            /** The offscreen document is responsible for playing audio. */
            AUDIO_PLAYBACK = "AUDIO_PLAYBACK",
            /** The offscreen document needs to embed and script an iframe in order to modify the iframe's content. */
            IFRAME_SCRIPTING = "IFRAME_SCRIPTING",
            /** The offscreen document needs to embed an iframe and scrape its DOM to extract information. */
            DOM_SCRAPING = "DOM_SCRAPING",
            /** The offscreen document needs to interact with Blob objects (including URL.createObjectURL()). */
            BLOBS = "BLOBS",
            /** The offscreen document needs to use the DOMParser API. */
            DOM_PARSER = "DOM_PARSER",
            /** The offscreen document needs to interact with media streams from user media (e.g. getUserMedia()). */
            USER_MEDIA = "USER_MEDIA",
            /** The offscreen document needs to interact with media streams from display media (e.g. getDisplayMedia()). */
            DISPLAY_MEDIA = "DISPLAY_MEDIA",
            /** The offscreen document needs to use WebRTC APIs. */
            WEB_RTC = "WEB_RTC",
            /** The offscreen document needs to interact with the clipboard APIs(e.g. Navigator.clipboard). */
            CLIPBOARD = "CLIPBOARD",
            /** Specifies that the offscreen document needs access to localStorage. */
            LOCAL_STORAGE = "LOCAL_STORAGE",
            /** Specifies that the offscreen document needs to spawn workers. */
            WORKERS = "WORKERS",
            /** Specifies that the offscreen document needs to use navigator.getBattery. */
            BATTERY_STATUS = "BATTERY_STATUS",
            /** Specifies that the offscreen document needs to use window.matchMedia. */
            MATCH_MEDIA = "MATCH_MEDIA",
            /** Specifies that the offscreen document needs to use navigator.geolocation. */
            GEOLOCATION = "GEOLOCATION",
        }

        /** The parameters describing the offscreen document to create. */
        export interface CreateParameters {
            /** The reason(s) the extension is creating the offscreen document. */
            reasons: `${Reason}`[];
            /** The (relative) URL to load in the document. */
            url: string;
            /** A developer-provided string that explains, in more detail, the need for the background context. The user agent _may_ use this in display to the user. */
            justification: string;
        }

        /**
         * Creates a new offscreen document for the extension.
         * @param parameters The parameters describing the offscreen document to create.
         * @return The `createDocument` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function createDocument(parameters: CreateParameters): Promise<void>;
        /**
         * Creates a new offscreen document for the extension.
         * @param parameters The parameters describing the offscreen document to create.
         * @param callback Invoked when the offscreen document is created and has completed its initial page load.
         */
        export function createDocument(parameters: CreateParameters, callback: () => void): void;

        /**
         * Closes the currently-open offscreen document for the extension.
         * @return The `closeDocument` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function closeDocument(): Promise<void>;
        /**
         * Closes the currently-open offscreen document for the extension.
         * @param callback Invoked when the offscreen document has been closed.
         */
        export function closeDocument(callback: () => void): void;

        /**
         * Determines whether the extension has an active document.
         * @return The `hasDocument` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function hasDocument(): Promise<boolean>;
        /**
         * Determines whether the extension has an active document.
         * @param callback Invoked with the result of whether the extension has an active offscreen document.
         */
        export function hasDocument(callback: (result: boolean) => void): void;
    }
} // end of chrome namespace
