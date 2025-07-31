// Chrome API namespace: types
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace types {
        /**
         * The scope of the ChromeSetting. One of
         * * `regular`: setting for the regular profile (which is inherited by the incognito profile if not overridden elsewhere),
         * * `regular_only`: setting for the regular profile only (not inherited by the incognito profile),
         * * `incognito_persistent`: setting for the incognito profile that survives browser restarts (overrides regular preferences)
         * * `incognito_session_only`: setting for the incognito profile that can only be set during an incognito session and is deleted when the incognito session ends (overrides regular and incognito_persistent preferences).
         * @since Chrome 44
         */
        export type ChromeSettingScope = "regular" | "regular_only" | "incognito_persistent" | "incognito_session_only";

        /**
         * One of
         * * `not_controllable`: cannot be controlled by any extension
         * * `controlled_by_other_extensions`: controlled by extensions with higher precedence
         * * `controllable_by_this_extension`: can be controlled by this extension
         * * `controlled_by_this_extension`: controlled by this extension
         * @since Chrome 44
         */
        export type LevelOfControl =
            | "not_controllable"
            | "controlled_by_other_extensions"
            | "controllable_by_this_extension"
            | "controlled_by_this_extension";

        /** Which setting to change. */
        export interface ChromeSettingSetDetails<T> {
            /**
             * The value of the setting.
             * Note that every setting has a specific value type, which is described together with the setting. An extension should not set a value of a different type.
             */
            value: T;
            /** Where to set the setting (default: regular). */
            scope?: ChromeSettingScope;
        }

        /** Which setting to consider. */
        export interface ChromeSettingGetDetails {
            /** Whether to return the value that applies to the incognito session (default false). */
            incognito?: boolean;
        }

        /** Details of the currently effective value */
        export interface ChromeSettingGetResult<T> {
            /** The level of control of the setting. */
            levelOfControl: LevelOfControl;
            /** The value of the setting. */
            value: T;
            /**
             * Whether the effective value is specific to the incognito session.
             * This property will only be present if the incognito property in the details parameter of get() was true.
             */
            incognitoSpecific?: boolean;
        }

        /** Which setting to clear. */
        export interface ChromeSettingClearDetails {
            /** Where to clear the setting (default: regular). */
            scope?: ChromeSettingScope;
        }

        /** Details of the currently effective value. */
        export interface ChromeSettingOnChangeDetails<T> {
            /**
             * Whether the effective value is specific to the incognito session. T
             * his property will only be present if the incognito property in the details parameter of get() was true.
             */
            incognitoSpecific?: boolean;
            /** The value of the setting. */
            value: T;
            /** The level of control of the setting. */
            levelOfControl: LevelOfControl;
        }

        /**
         * An interface that allows access to a Chrome browser setting.
         * See {@link chrome.accessibilityFeatures} for an example.
         */
        export interface ChromeSetting<T> {
            /**
             * Sets the value of a setting.
             * Can return its result via Promise in Manifest V3 or later since Chrome 96.
             */
            set(details: ChromeSettingSetDetails<T>, callback: () => void): void;
            set(details: ChromeSettingSetDetails<T>): Promise<void>;

            /**
             * Gets the value of a setting.
             * Can return its result via Promise in Manifest V3 or later since Chrome 96.
             */
            get(details: ChromeSettingGetDetails, callback: (details: ChromeSettingGetResult<T>) => void): void;
            get(details: ChromeSettingGetDetails): Promise<ChromeSettingGetResult<T>>;

            /**
             * Clears the setting, restoring any default value.
             * Can return its result via Promise in Manifest V3 or later since Chrome 96.
             */
            clear(details: ChromeSettingClearDetails, callback: () => void): void;
            clear(details: ChromeSettingClearDetails): Promise<void>;

            /** Fired after the setting changes. */
            onChange: chrome.events.Event<(details: ChromeSettingOnChangeDetails<T>) => void>;
        }
    }
} // end of chrome namespace
