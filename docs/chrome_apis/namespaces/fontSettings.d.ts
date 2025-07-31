// Chrome API namespace: fontSettings
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace fontSettings {
        /** Represents a font name. */
        export interface FontName {
            /** The display name of the font. */
            displayName: string;
            /** The font ID. */
            fontId: string;
        }

        export interface DefaultFontSizeDetails {
            /** The font size in pixels. */
            pixelSize: number;
        }

        export interface FontDetails {
            /** The generic font family for the font. */
            genericFamily:
                | "cursive"
                | "fantasy"
                | "fixed"
                | "sansserif"
                | "serif"
                | "standard";
            /** Optional. The script for the font. If omitted, the global script font setting is affected.  */
            script?: string | undefined;
        }

        export interface FullFontDetails {
            /** The generic font family for which the font setting has changed. */
            genericFamily: string;
            /** The level of control this extension has over the setting. */
            levelOfControl: string;
            /** Optional. The script code for which the font setting has changed.  */
            script?: string | undefined;
            /** The font ID. See the description in getFont. */
            fontId: string;
        }

        export interface FontDetailsResult {
            /** The level of control this extension has over the setting. */
            levelOfControl: string;
            /** The font ID. Rather than the literal font ID preference value, this may be the ID of the font that the system resolves the preference value to. So, fontId can differ from the font passed to setFont, if, for example, the font is not available on the system. The empty string signifies fallback to the global script font setting. */
            fontId: string;
        }

        export interface FontSizeDetails {
            /** The font size in pixels. */
            pixelSize: number;
            /** The level of control this extension has over the setting. */
            levelOfControl: string;
        }

        export interface SetFontSizeDetails {
            /** The font size in pixels. */
            pixelSize: number;
        }

        export interface SetFontDetails extends FontDetails {
            /** The font ID. The empty string means to fallback to the global script font setting. */
            fontId: string;
        }

        export interface DefaultFixedFontSizeChangedEvent
            extends chrome.events.Event<(details: FontSizeDetails) => void>
        {}

        export interface DefaultFontSizeChangedEvent extends chrome.events.Event<(details: FontSizeDetails) => void> {}

        export interface MinimumFontSizeChangedEvent extends chrome.events.Event<(details: FontSizeDetails) => void> {}

        export interface FontChangedEvent extends chrome.events.Event<(details: FullFontDetails) => void> {}

        /**
         * Sets the default font size.
         * @return The `setDefaultFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setDefaultFontSize(details: DefaultFontSizeDetails): Promise<void>;
        /**
         * Sets the default font size.
         */
        export function setDefaultFontSize(details: DefaultFontSizeDetails, callback: () => void): void;
        /**
         * Gets the font for a given script and generic font family.
         * @return The `getFont` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getFont(details: FontDetails): Promise<FontDetailsResult>;
        /**
         * Gets the font for a given script and generic font family.
         */
        export function getFont(details: FontDetails, callback: (details: FontDetailsResult) => void): void;
        /**
         * Gets the default font size.
         * @param details This parameter is currently unused.
         * @return The `getDefaultFontSize` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getDefaultFontSize(details?: unknown): Promise<FontSizeDetails>;
        /**
         * Gets the default font size.
         * @param details This parameter is currently unused.
         */
        export function getDefaultFontSize(callback: (options: FontSizeDetails) => void): void;
        export function getDefaultFontSize(details: unknown, callback: (options: FontSizeDetails) => void): void;
        /**
         * Gets the minimum font size.
         * @param details This parameter is currently unused.
         * @return The `getMinimumFontSize` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getMinimumFontSize(details?: unknown): Promise<FontSizeDetails>;
        /**
         * Gets the minimum font size.
         * @param details This parameter is currently unused.
         */
        export function getMinimumFontSize(callback: (options: FontSizeDetails) => void): void;
        export function getMinimumFontSize(details: unknown, callback: (options: FontSizeDetails) => void): void;
        /**
         * Sets the minimum font size.
         * @return The `setMinimumFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setMinimumFontSize(details: SetFontSizeDetails): Promise<void>;
        /**
         * Sets the minimum font size.
         */
        export function setMinimumFontSize(details: SetFontSizeDetails, callback: () => void): void;
        /**
         * Gets the default size for fixed width fonts.
         * @param details This parameter is currently unused.
         * @return The `getDefaultFixedFontSize` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getDefaultFixedFontSize(details?: unknown): Promise<FontSizeDetails>;
        /**
         * Gets the default size for fixed width fonts.
         * @param details This parameter is currently unused.
         */
        export function getDefaultFixedFontSize(callback: (details: FontSizeDetails) => void): void;
        export function getDefaultFixedFontSize(details: unknown, callback: (details: FontSizeDetails) => void): void;
        /**
         * Clears the default font size set by this extension, if any.
         * @param details This parameter is currently unused.
         * @return The `clearDefaultFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function clearDefaultFontSize(details?: unknown): Promise<void>;
        /**
         * Clears the default font size set by this extension, if any.
         * @param details This parameter is currently unused.
         */
        export function clearDefaultFontSize(callback: () => void): void;
        export function clearDefaultFontSize(details: unknown, callback: () => void): void;
        /**
         * Sets the default size for fixed width fonts.
         * @return The `setDefaultFixedFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setDefaultFixedFontSize(details: SetFontSizeDetails): Promise<void>;
        /**
         * Sets the default size for fixed width fonts.
         */
        export function setDefaultFixedFontSize(details: SetFontSizeDetails, callback: () => void): void;
        /**
         * Clears the font set by this extension, if any.
         * @return The `clearFont` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function clearFont(details: FontDetails): Promise<void>;
        /**
         * Clears the font set by this extension, if any.
         */
        export function clearFont(details: FontDetails, callback: () => void): void;
        /**
         * Sets the font for a given script and generic font family.
         * @return The `setFont` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function setFont(details: SetFontDetails): Promise<void>;
        /**
         * Sets the font for a given script and generic font family.
         */
        export function setFont(details: SetFontDetails, callback: () => void): void;
        /**
         * Clears the minimum font size set by this extension, if any.
         * @param details This parameter is currently unused.
         * @return The `clearMinimumFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function clearMinimumFontSize(details?: unknown): Promise<void>;
        /**
         * Clears the minimum font size set by this extension, if any.
         * @param details This parameter is currently unused.
         */
        export function clearMinimumFontSize(callback: () => void): void;
        export function clearMinimumFontSize(details: unknown, callback: () => void): void;
        /**
         * Gets a list of fonts on the system.
         * @return The `getFontList` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getFontList(): Promise<FontName[]>;
        /**
         * Gets a list of fonts on the system.
         */
        export function getFontList(callback: (results: FontName[]) => void): void;
        /**
         * Clears the default fixed font size set by this extension, if any.
         * @param details This parameter is currently unused.
         * @return The `clearDefaultFixedFontSize` method provides its result via callback or returned as a `Promise` (MV3 only). It has no parameters.
         */
        export function clearDefaultFixedFontSize(details: unknown): Promise<void>;
        /**
         * Clears the default fixed font size set by this extension, if any.
         * @param details This parameter is currently unused.
         */
        export function clearDefaultFixedFontSize(details: unknown, callback: () => void): void;

        /** Fired when the default fixed font size setting changes. */
        export var onDefaultFixedFontSizeChanged: DefaultFixedFontSizeChangedEvent;
        /** Fired when the default font size setting changes. */
        export var onDefaultFontSizeChanged: DefaultFontSizeChangedEvent;
        /** Fired when the minimum font size setting changes. */
        export var onMinimumFontSizeChanged: MinimumFontSizeChangedEvent;
        /** Fired when a font setting changes. */
        export var onFontChanged: FontChangedEvent;
    }
} // end of chrome namespace
