// Chrome API namespace: dom
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace dom {
        /**
         * @since Chrome 88
         * Requests chrome to return the open/closed shadow roots else return null.
         * @param element reference of HTMLElement.
         */
        export function openOrClosedShadowRoot(element: HTMLElement): ShadowRoot | null;
    }
} // end of chrome namespace
