// Chrome API namespace: action
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace action {
        export interface BadgeColorDetails {
            /** An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is `[255, 0, 0, 255]`. Can also be a string with a CSS value, with opaque red being `#FF0000` or `#F00`. */
            color: string | ColorArray;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | undefined;
        }

        export interface BadgeTextDetails {
            /** Any number of characters can be passed, but only about four can fit in the space. If an empty string (`''`) is passed, the badge text is cleared. If `tabId` is specified and `text` is null, the text for the specified tab is cleared and defaults to the global badge text. */
            text?: string | undefined;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | undefined;
        }

        export type ColorArray = [number, number, number, number];

        export interface TitleDetails {
            /** The string the action should display when moused over. */
            title: string;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
        }

        export interface PopupDetails {
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed. */
            tabId?: number | undefined;
            /** The html file to show in a popup. If set to the empty string (`''`), no popup is shown. */
            popup: string;
        }

        export interface TabIconDetails {
            /** Either a relative image path or a dictionary {size -> relative image path} pointing to icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.path = foo' is equivalent to 'details.path = {'16': foo}' */
            path?: string | { [index: number]: string } | undefined;
            /** Limits the change to when a particular tab is selected. Automatically resets when the tab is closed.  */
            tabId?: number | undefined;
            /** Either an ImageData object or a dictionary {size -> ImageData} representing icon to be set. If the icon is specified as a dictionary, the actual image to be used is chosen depending on screen's pixel density. If the number of image pixels that fit into one screen space unit equals `scale`, then image with size `scale` \* n will be selected, where n is the size of the icon in the UI. At least one image must be specified. Note that 'details.imageData = foo' is equivalent to 'details.imageData = {'16': foo}' */
            imageData?: ImageData | { [index: number]: ImageData } | undefined;
        }

        /** @since Chrome 99 */
        export interface OpenPopupOptions {
            /** The id of the window to open the action popup in. Defaults to the currently-active window if unspecified.  */
            windowId?: number | undefined;
        }

        export interface TabDetails {
            /** The ID of the tab to query state for. If no tab is specified, the non-tab-specific state is returned.  */
            tabId?: number | undefined;
        }

        /**
         * The collection of user-specified settings relating to an extension's action.
         * @since Chrome 91
         */
        export interface UserSettings {
            /** Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user). */
            isOnToolbar: boolean;
        }

        /** @since Chrome 130 */
        export interface UserSettingsChange {
            /** Whether the extension's action icon is visible on browser windows' top-level toolbar (i.e., whether the extension has been 'pinned' by the user). */
            isOnToolbar?: boolean;
        }

        /**
         * Disables the action for a tab.
         * @param tabId The ID of the tab for which you want to modify the action.
         *
         * Can return its result via Promise.
         */
        export function disable(tabId?: number): Promise<void>;
        export function disable(callback: () => void): void;
        export function disable(tabId: number | undefined, callback: () => void): void;

        /**
         * Enables the action for a tab. By default, actions are enabled.
         * @param tabId The ID of the tab for which you want to modify the action.
         *
         * Can return its result via Promise.
         */
        export function enable(tabId?: number): Promise<void>;
        export function enable(callback: () => void): void;
        export function enable(tabId: number | undefined, callback: () => void): void;

        /**
         * Gets the background color of the action.
         *
         * Can return its result via Promise.
         */
        export function getBadgeBackgroundColor(details: TabDetails): Promise<ColorArray>;
        export function getBadgeBackgroundColor(details: TabDetails, callback: (result: ColorArray) => void): void;

        /**
         * Gets the badge text of the action. If no tab is specified, the non-tab-specific badge text is returned. If {@link declarativeNetRequest.ExtensionActionOptions.displayActionCountAsBadgeText displayActionCountAsBadgeText} is enabled, a placeholder text will be returned unless the {@link runtime.ManifestPermissions declarativeNetRequestFeedback} permission is present or tab-specific badge text was provided.
         *
         * Can return its result via Promise.
         */
        export function getBadgeText(details: TabDetails): Promise<string>;
        export function getBadgeText(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Gets the text color of the action.
         *
         * Can return its result via Promise.
         * @since Chrome 110
         */
        export function getBadgeTextColor(details: TabDetails): Promise<ColorArray>;
        export function getBadgeTextColor(details: TabDetails, callback: (result: ColorArray) => void): void;

        /**
         * Gets the html document set as the popup for this action.
         *
         * Can return its result via Promise.
         */
        export function getPopup(details: TabDetails): Promise<string>;
        export function getPopup(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Gets the title of the action.
         *
         * Can return its result via Promise.
         */
        export function getTitle(details: TabDetails): Promise<string>;
        export function getTitle(details: TabDetails, callback: (result: string) => void): void;

        /**
         * Returns the user-specified settings relating to an extension's action.
         *
         * Can return its result via Promise.
         * @since Chrome 91
         */
        export function getUserSettings(): Promise<UserSettings>;
        export function getUserSettings(callback: (userSettings: UserSettings) => void): void;

        /**
         * Indicates whether the extension action is enabled for a tab (or globally if no `tabId` is provided). Actions enabled using only {@link declarativeContent} always return false.
         *
         * Can return its result via Promise.
         * @since Chrome 110
         */
        export function isEnabled(tabId?: number): Promise<boolean>;
        export function isEnabled(callback: (isEnabled: boolean) => void): void;
        export function isEnabled(tabId: number | undefined, callback: (isEnabled: boolean) => void): void;

        /**
         * Opens the extension's popup. Between Chrome 118 and Chrome 126, this is only available to policy installed extensions.
         *
         * @param options Specifies options for opening the popup.
         *
         * Can return its result via Promise.
         * @since Chrome 127
         */
        export function openPopup(options?: OpenPopupOptions): Promise<void>;
        export function openPopup(callback: () => void): void;
        export function openPopup(options: OpenPopupOptions | undefined, callback: () => void): void;

        /**
         * Sets the background color for the badge.
         *
         * Can return its result via Promise.
         */
        export function setBadgeBackgroundColor(details: BadgeColorDetails): Promise<void>;
        export function setBadgeBackgroundColor(details: BadgeColorDetails, callback: () => void): void;

        /**
         * Sets the badge text for the action. The badge is displayed on top of the icon.
         *
         * Can return its result via Promise.
         */
        export function setBadgeText(details: BadgeTextDetails): Promise<void>;
        export function setBadgeText(details: BadgeTextDetails, callback: () => void): void;

        /**
         * Sets the text color for the badge.
         *
         * Can return its result via Promise.
         * @since Chrome 110
         */
        export function setBadgeTextColor(details: BadgeColorDetails): Promise<void>;
        export function setBadgeTextColor(details: BadgeColorDetails, callback: () => void): void;

        /**
         * Sets the icon for the action. The icon can be specified either as the path to an image file or as the pixel data from a canvas element, or as dictionary of either one of those. Either the path or the imageData property must be specified.
         *
         * Can return its result via Promise.
         */
        export function setIcon(details: TabIconDetails): Promise<void>;
        export function setIcon(details: TabIconDetails, callback: () => void): void;

        /**
         * Sets the html document to be opened as a popup when the user clicks on the action's icon.
         *
         * Can return its result via Promise.
         */
        export function setPopup(details: PopupDetails): Promise<void>;
        export function setPopup(details: PopupDetails, callback: () => void): void;

        /**
         * Sets the title of the action. This shows up in the tooltip.
         *
         * Can return its result via Promise.
         */
        export function setTitle(details: TitleDetails): Promise<void>;
        export function setTitle(details: TitleDetails, callback: () => void): void;

        /** Fired when an action icon is clicked. This event will not fire if the action has a popup. */
        export const onClicked: events.Event<(tab: chrome.tabs.Tab) => void>;

        /**
         * Fired when user-specified settings relating to an extension's action change.
         * @since Chrome 130
         */
        export const onUserSettingsChanged: events.Event<(change: UserSettingsChange) => void>;
    }
} // end of chrome namespace
