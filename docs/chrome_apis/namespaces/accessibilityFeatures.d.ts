// Chrome API namespace: accessibilityFeatures
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace accessibilityFeatures {
        /** `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission. */
        export const animationPolicy: chrome.types.ChromeSetting<"allowed" | "once" | "none">;

        /**
         * Auto mouse click after mouse stops moving. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const autoclick: chrome.types.ChromeSetting<boolean>;

        /**
         * Caret highlighting. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        export const caretHighlight: chrome.types.ChromeSetting<boolean>;

        /**
         * Cursor color. The value indicates whether the feature is enabled or not, doesn't indicate the color of it.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 85
         */
        export const cursorColor: chrome.types.ChromeSetting<boolean>;

        /**
         * Cursor highlighting. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        export const cursorHighlight: chrome.types.ChromeSetting<boolean>;

        /**
         * Dictation. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 90
         */
        export const dictation: chrome.types.ChromeSetting<boolean>;

        /**
         * Docked magnifier. The value indicates whether docked magnifier feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 87
         */
        export const dockedMagnifier: chrome.types.ChromeSetting<boolean>;

        /**
         * Focus highlighting. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        export const focusHighlight: chrome.types.ChromeSetting<boolean>;

        /**
         * High contrast rendering mode. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const highContrast: chrome.types.ChromeSetting<boolean>;

        /**
         * Enlarged cursor. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const largeCursor: chrome.types.ChromeSetting<boolean>;

        /**
         * Full screen magnification. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const screenMagnifier: chrome.types.ChromeSetting<boolean>;

        /**
         * Select-to-speak. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        export const selectToSpeak: chrome.types.ChromeSetting<boolean>;

        /**
         * Spoken feedback (text-to-speech). The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const spokenFeedback: chrome.types.ChromeSetting<boolean>;

        /**
         * Sticky modifier keys (like shift or alt). The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const stickyKeys: chrome.types.ChromeSetting<boolean>;

        /**
         * Switch Access. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         * @since Chrome 51
         */
        export const switchAccess: chrome.types.ChromeSetting<boolean>;

        /**
         * Virtual on-screen keyboard. The value indicates whether the feature is enabled or not.
         * `get()` requires `accessibilityFeatures.read` permission. `set()` and `clear()` require `accessibilityFeatures.modify` permission.
         * @platform ChromeOS only
         */
        export const virtualKeyboard: chrome.types.ChromeSetting<boolean>;
    }
} // end of chrome namespace
