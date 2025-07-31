// Chrome API namespace: browserAction
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace browserAction {
        export interface BadgeBackgroundColorDetails {
            /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00. */
            color: string | ColorArray;
            /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
        }

        export interface BadgeTextDetails {
            /** Any number of characters can be passed, but only about four can fit in the space. */
            text?: string | null | undefined;
            /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
        }

        export type ColorArray = [number, number, number, number];

        export interface TitleDetails {
            /** The string the browser action should display when moused over. */
            title: string;
            /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | null;
        }

        export interface TabDetails {
            /** Optional. Specify the tab to get the information. If no tab is specified, the non-tab-specific information is returned.  */
            tabId?: number | null;
        }

        export interface TabIconDetails {
            /** Optional. Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.imageData = {'19': foo}'  */
            path?: string | { [index: string]: string } | undefined;
            /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
            /** Optional. Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals scale, then image with size scale * 19 will be selected. Initially only scales 1 and 2 will be supported. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'19': foo}'  */
            imageData?: ImageData | { [index: number]: ImageData } | undefined;
        }

        export interface PopupDetails {
            /** Optional. Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | null;
            /** The html file to show in a popup. If set to the empty string (''), no popup is shown. */
            popup: string;
        }

        export interface BrowserClickedEvent extends chrome.events.Event<(tab: chrome.tabs.Tab) => void> {}

        /**
         * @since Chrome 22
         * Enables the browser action for a tab. By default, browser actions are enabled.
         * @param tabId The id of the tab for which you want to modify the browser action.
         * @return The `enable` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function enable(tabId?: number | null): Promise<void>;
        /**
         * @since Chrome 22
         * Enables the browser action for a tab. By default, browser actions are enabled.
         * @param tabId The id of the tab for which you want to modify the browser action.
         * @param callback Supported since Chrome 67
         */
        export function enable(callback?: () => void): void;
        export function enable(tabId: number | null | undefined, callback?: () => void): void;
        /**
         * Sets the background color for the badge.
         * @return The `setBadgeBackgroundColor` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails): Promise<void>;
        /**
         * Sets the background color for the badge.
         * @param callback Supported since Chrome 67
         */
        export function setBadgeBackgroundColor(details: BadgeBackgroundColorDetails, callback?: () => void): void;
        /**
         * Sets the badge text for the browser action. The badge is displayed on top of the icon.
         * @return The `setBadgeText` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setBadgeText(details: BadgeTextDetails): Promise<void>;
        /**
         * Sets the badge text for the browser action. The badge is displayed on top of the icon.
         * @param callback Supported since Chrome 67
         */
        export function setBadgeText(details: BadgeTextDetails, callback: () => void): void;
        /**
         * Sets the title of the browser action. This shows up in the tooltip.
         * @return The `setTitle` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setTitle(details: TitleDetails): Promise<void>;
        /**
         * Sets the title of the browser action. This shows up in the tooltip.
         * @param callback Supported since Chrome 67
         */
        export function setTitle(details: TitleDetails, callback: () => void): void;
        /**
         * @since Chrome 19
         * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
         * @param callback Supported since Chrome 67
         */
        export function getBadgeText(details: TabDetails, callback: (result: string) => void): void;
        /**
         * @since Chrome 19
         * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
         * @return The `getBadgeText` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getBadgeText(details: TabDetails): Promise<string>;
        /**
         * Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
         * @return The `setPopup` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setPopup(details: PopupDetails): Promise<void>;
        /**
         * Sets the html document to be opened as a popup when the user clicks on the browser action's icon.
         * @param callback Supported since Chrome 67
         */
        export function setPopup(details: PopupDetails, callback?: () => void): void;
        /**
         * @since Chrome 22
         * Disables the browser action for a tab.
         * @param tabId The id of the tab for which you want to modify the browser action.
         * @return The `disable` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function disable(tabId?: number | null): Promise<void>;
        /**
         * @since Chrome 22
         * Disables the browser action for a tab.
         * @param tabId The id of the tab for which you want to modify the browser action.
         * @param callback Supported since Chrome 67
         */
        export function disable(callback: () => void): void;
        export function disable(tabId?: number | null, callback?: () => void): void;
        /**
         * @since Chrome 19
         * Gets the title of the browser action.
         */
        export function getTitle(details: TabDetails, callback: (result: string) => void): void;
        /**
         * @since Chrome 19
         * Gets the title of the browser action.
         * @return The `getTitle` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getTitle(details: TabDetails): Promise<string>;
        /**
         * @since Chrome 19
         * Gets the background color of the browser action.
         */
        export function getBadgeBackgroundColor(details: TabDetails, callback: (result: ColorArray) => void): void;
        /**
         * @since Chrome 19
         * Gets the background color of the browser action.
         * @return The `getBadgeBackgroundColor` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getBadgeBackgroundColor(details: TabDetails): Promise<ColorArray>;
        /**
         * @since Chrome 19
         * Gets the html document set as the popup for this browser action.
         */
        export function getPopup(details: TabDetails, callback: (result: string) => void): void;
        /**
         * @since Chrome 19
         * Gets the html document set as the popup for this browser action.
         * @return The `getPopup` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getPopup(details: TabDetails): Promise<string>;
        /**
         * Sets the icon for the browser action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
         */
        export function setIcon(details: TabIconDetails, callback?: () => void): void;

        /** Fired when a browser action icon is clicked. This event will not fire if the browser action has a popup. */
        export var onClicked: BrowserClickedEvent;
    }
} // end of chrome namespace
