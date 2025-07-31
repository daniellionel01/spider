// Chrome API namespace: declarativeContent
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace declarativeContent {
        export class PageStateMatcherProperties {
            /** Optional. Filters URLs for various criteria. See event filtering. All criteria are case sensitive.  */
            pageUrl?: events.UrlFilter | undefined;
            /** Optional. Matches if all of the CSS selectors in the array match displayed elements in a frame with the same origin as the page's main frame. All selectors in this array must be compound selectors to speed up matching. Note that listing hundreds of CSS selectors or CSS selectors that match hundreds of times per page can still slow down web sites.  */
            css?: string[] | undefined;
            /**
             * Optional.
             * @since Chrome 45
             * Matches if the bookmarked state of the page is equal to the specified value. Requires the bookmarks permission.
             */
            isBookmarked?: boolean | undefined;
        }

        /** Matches the state of a web page by various criteria. */
        export class PageStateMatcher {
            constructor(options: PageStateMatcherProperties);
        }

        /**
         * Declarative event action that enables the extension's action while the corresponding conditions are met.
         * Manifest v3.
         */
        export class ShowAction {}

        /**
         * Declarative event action that shows the extension's page action while the corresponding conditions are met.
         * Manifest v2.
         */
        export class ShowPageAction {}

        /** Declarative event action that changes the icon of the page action while the corresponding conditions are met. */
        export class SetIcon {
            constructor(options?: { imageData?: ImageData | { [size: string]: ImageData } | undefined });
        }

        /** Provides the Declarative Event API consisting of addRules, removeRules, and getRules. */
        export interface PageChangedEvent extends chrome.events.Event<() => void> {}

        export var onPageChanged: PageChangedEvent;
    }
} // end of chrome namespace
