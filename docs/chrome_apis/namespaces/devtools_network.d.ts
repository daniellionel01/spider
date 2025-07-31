// Chrome API namespace: devtools.network
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace devtools.network {
        /** Represents a HAR entry for a specific finished request. */
        export interface HAREntry extends HARFormatEntry {}
        /** Represents a HAR log that contains all known network requests. */
        export interface HARLog extends HARFormatLog {}
        /** Represents a network request for a document resource (script, image and so on). See HAR Specification for reference. */
        export interface Request extends chrome.devtools.network.HAREntry {
            /**
             * Returns content of the response body.
             * @param callback A function that receives the response body when the request completes.
             */
            getContent(
                callback: (
                    /** Content of the response body (potentially encoded) */
                    content: string,
                    /** Empty if content is not encoded, encoding name otherwise. Currently, only base64 is supported */
                    encoding: string,
                ) => void,
            ): void;
        }

        export interface RequestFinishedEvent extends chrome.events.Event<(request: Request) => void> {}

        export interface NavigatedEvent extends chrome.events.Event<(url: string) => void> {}

        /**
         * Returns HAR log that contains all known network requests.
         * @param callback A function that receives the HAR log when the request completes.
         * Parameter harLog: A HAR log. See HAR specification for details.
         */
        export function getHAR(callback: (harLog: HARLog) => void): void;

        /** Fired when a network request is finished and all request data are available. */
        export var onRequestFinished: RequestFinishedEvent;
        /** Fired when the inspected window navigates to a new page. */
        export var onNavigated: NavigatedEvent;
    }
} // end of chrome namespace
