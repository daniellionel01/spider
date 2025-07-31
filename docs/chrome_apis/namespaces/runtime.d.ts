// Chrome API namespace: runtime
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace runtime {
        export interface LastError {
            /** Details about the error which occurred.  */
            message?: string;
        }

        /** Populated with an error message if calling an API function fails; otherwise undefined. This is only defined within the scope of that function's callback. If an error is produced, but `runtime.lastError` is not accessed within the callback, a message is logged to the console listing the API function that produced the error. API functions that return promises do not set this property. */
        export const lastError: LastError | undefined;

        /** The ID of the extension/app. */
        export const id: string;

        /**
         * The operating system Chrome is running on.
         * @since Chrome 44
         */
        export enum PlatformOs {
            /** Specifies the MacOS operating system. */
            MAC = "mac",
            /** Specifies the Windows operating system. */
            WIN = "win",
            /** Specifies the Android operating system. */
            ANDROID = "android",
            /** Specifies the Chrome operating system. */
            CROS = "cros",
            /** Specifies the Linux operating system. */
            LINUX = "linux",
            /** Specifies the OpenBSD operating system. */
            OPENBSD = "openbsd",
            /** Specifies the Fuchsia operating system. */
            FUCHSIA = "fuchsia",
        }

        /**
         * The machine's processor architecture.
         * @since Chrome 44
         */
        export enum PlatformArch {
            /** Specifies the processer architecture as arm. */
            ARM = "arm",
            /** Specifies the processer architecture as arm64. */
            ARM64 = "arm64",
            /** Specifies the processer architecture as x86-32. */
            X86_32 = "x86-32",
            /** Specifies the processer architecture as x86-64. */
            X86_64 = "x86-64",
            /** Specifies the processer architecture as mips. */
            MIPS = "mips",
            /** Specifies the processer architecture as mips64. */
            MIPS64 = "mips64",
        }

        /**
         * The native client architecture. This may be different from arch on some platforms.
         * @since Chrome 44
         */
        export enum PlatformNaclArch {
            /** Specifies the native client architecture as arm. */
            ARM = "arm",
            /** Specifies the native client architecture as x86-32. */
            X86_32 = "x86-32",
            /** Specifies the native client architecture as x86-64. */
            X86_64 = "x86-64",
            /** Specifies the native client architecture as mips. */
            MIPS = "mips",
            /** Specifies the native client architecture as mips64. */
            MIPS64 = "mips64",
        }

        /** @since Chrome 114 */
        export enum ContextType {
            /** Specifies the context type as a tab */
            TAB = "TAB",
            /** Specifies the context type as an extension popup window */
            POPUP = "POPUP",
            /** Specifies the context type as a service worker. */
            BACKGROUND = "BACKGROUND",
            /** Specifies the context type as an offscreen document. */
            OFFSCREEN_DOCUMENT = "OFFSCREEN_DOCUMENT",
            /** Specifies the context type as a side panel. */
            SIDE_PANEL = "SIDE_PANEL",
            /** Specifies the context type as developer tools. */
            DEVELOPER_TOOLS = "DEVELOPER_TOOLS",
        }

        /**
         * The reason that this event is being dispatched.
         * @since Chrome 44
         */
        export enum OnInstalledReason {
            /** Specifies the event reason as an installation. */
            INSTALL = "install",
            /** Specifies the event reason as an extension update. */
            UPDATE = "update",
            /** Specifies the event reason as a Chrome update. */
            CHROME_UPDATE = "chrome_update",
            /** Specifies the event reason as an update to a shared module. */
            SHARED_MODULE_UPDATE = "shared_module_update",
        }

        /**
         * The reason that the event is being dispatched. 'app_update' is used when the restart is needed because the application is updated to a newer version. 'os_update' is used when the restart is needed because the browser/OS is updated to a newer version. 'periodic' is used when the system runs for more than the permitted uptime set in the enterprise policy.
         * @since Chrome 44
         */
        export enum OnRestartRequiredReason {
            /** Specifies the event reason as an update to the app. */
            APP_UPDATE = "app_update",
            /** Specifies the event reason as an update to the operating system. */
            OS_UPDATE = "os_update",
            /** Specifies the event reason as a periodic restart of the app. */
            PERIODIC = "periodic",
        }

        /**
         * A filter to match against certain extension contexts. Matching contexts must match all specified filters; any filter that is not specified matches all available contexts. Thus, a filter of `{}` will match all available contexts.
         * @since Chrome 114
         */
        export interface ContextFilter {
            contextIds?: string[] | undefined;
            contextTypes?: `${ContextType}`[] | undefined;
            documentIds?: string[] | undefined;
            documentOrigins?: string[] | undefined;
            documentUrls?: string[] | undefined;
            frameIds?: number[] | undefined;
            incognito?: boolean | undefined;
            tabIds?: number[] | undefined;
            windowIds?: number[] | undefined;
        }

        export interface ConnectInfo {
            /** Will be passed into onConnect for processes that are listening for the connection event. */
            name?: string | undefined;
            /** Whether the TLS channel ID will be passed into onConnectExternal for processes that are listening for the connection event. */
            includeTlsChannelId?: boolean | undefined;
        }

        export interface InstalledDetails {
            /** The reason that this event is being dispatched. */
            reason: `${OnInstalledReason}`;
            /** Indicates the previous version of the extension, which has just been updated. This is present only if 'reason' is 'update'. */
            previousVersion?: string;
            /** Indicates the ID of the imported shared module extension which updated. This is present only if 'reason' is 'shared_module_update'. */
            id?: string;
        }

        /**
         * A context hosting extension content.
         * @since Chrome 114
         */
        export interface ExtensionContext {
            /** A unique identifier for this context */
            contextId: string;
            /** The type of context this corresponds to. */
            contextType: `${ContextType}`;
            /** A UUID for the document associated with this context, or undefined if this context is hosted not in a document.*/
            documentId?: string;
            /** The origin of the document associated with this context, or undefined if the context is not hosted in a document. */
            documentOrigin?: string;
            /** The URL of the document associated with this context, or undefined if the context is not hosted in a document. */
            documentUrl?: string;
            /** The ID of the frame for this context, or `-1` if this context is not hosted in a frame. */
            frameId: number;
            /** Whether the context is associated with an incognito profile. */
            incognito: boolean;
            /** The ID of the tab for this context, or `-1` if this context is not hosted in a tab. */
            tabId: number;
            /** The ID of the window for this context, or `-1` if this context is not hosted in a window. */
            windowId: number;
        }

        export interface MessageOptions {
            /** Whether the TLS channel ID will be passed into onMessageExternal for processes that are listening for the connection event. */
            includeTlsChannelId?: boolean | undefined;
        }

        /** An object containing information about the script context that sent a message or request */
        export interface MessageSender {
            /** The ID of the extension that opened the connection, if any. */
            id?: string;
            /** The {@link tabs.Tab} which opened the connection, if any. This property will **only** be present when the connection was opened from a tab (including content scripts), and **only** if the receiver is an extension, not an app. */
            tab?: chrome.tabs.Tab;
            /**
             * The name of the native application that opened the connection, if any.
             * @since Chrome 74
             */
            nativeApplication?: string;
            /** The frame that opened the connection. 0 for top-level frames, positive for child frames. This will only be set when tab is set. */
            frameId?: number;
            /** The URL of the page or frame that opened the connection. If the sender is in an iframe, it will be iframe's URL not the URL of the page which hosts it. */
            url?: string;
            /** The TLS channel ID of the page or frame that opened the connection, if requested by the extension, and if available */
            tlsChannelId?: string;
            /**
             * The origin of the page or frame that opened the connection. It can vary from the url property (e.g., about:blank) or can be opaque (e.g., sandboxed iframes). This is useful for identifying if the origin can be trusted if we can't immediately tell from the URL.
             * @since Chrome 80
             */
            origin?: string;
            /**
             * The lifecycle the document that opened the connection is in at the time the port was created. Note that the lifecycle state of the document may have changed since port creation.
             * @since Chrome 106
             */
            documentLifecycle?: extensionTypes.DocumentLifecycle;
            /**
             * A UUID of the document that opened the connection.
             * @since Chrome 106
             */
            documentId?: string;
        }

        /** An object containing information about the current platform. */
        export interface PlatformInfo {
            /** The operating system Chrome is running on. */
            os: `${PlatformOs}`;
            /** The machine's processor architecture. */
            arch: `${PlatformArch}`;
            /** The native client architecture. This may be different from arch on some platforms. */
            nacl_arch: `${PlatformNaclArch}`;
        }

        /** An object which allows two way communication with other pages. */
        export interface Port {
            /** Send a message to the other end of the port. If the port is disconnected, an error is thrown. */
            postMessage: (message: any) => void;
            /** Immediately disconnect the port. Calling `disconnect()` on an already-disconnected port has no effect. When a port is disconnected, no new events will be dispatched to this port. */
            disconnect: () => void;
            /** This property will **only** be present on ports passed to {@link runtime.onConnect onConnect} / {@link runtime.onConnectExternal onConnectExternal} / {@link runtime.onConnectExternal onConnectNative} listeners. */
            sender?: MessageSender;
            /** Fired when the port is disconnected from the other end(s). {@link runtime.lastError} may be set if the port was disconnected by an error. If the port is closed via {@link Port.disconnect disconnect}, then this event is _only_ fired on the other end. This event is fired at most once (see also Port lifetime). */
            onDisconnect: events.Event<(port: Port) => void>;
            /** This event is fired when {@link Port.postMessage postMessage} is called by the other end of the port. */
            onMessage: events.Event<(message: any, port: Port) => void>;
            /** The name of the port, as specified in the call to {@link runtime.connect}. */
            name: string;
        }

        export interface UpdateAvailableDetails {
            /** The version number of the available update. */
            version: string;
        }

        export interface UpdateCheckDetails {
            /** The version of the available update. */
            version: string;
        }

        /**
         * Result of the update check.
         * @since Chrome 44
         */
        export enum RequestUpdateCheckStatus {
            /** Specifies that the status check has been throttled. This can occur after repeated checks within a short amount of time. */
            THROTTLED = "throttled",
            /** Specifies that there are no available updates to install. */
            NO_UPDATE = "no_update",
            /** Specifies that there is an available update to install. */
            UPDATE_AVAILABLE = "update_available",
        }

        export interface RequestUpdateCheckResult {
            /** Result of the update check. */
            status: `${RequestUpdateCheckStatus}`;
            /** If an update is available, this contains the version of the available update. */
            version?: string;
        }

        export interface ManifestIcons {
            [size: number]: string;
        }

        export interface ManifestAction {
            default_icon?: ManifestIcons | undefined;
            default_title?: string | undefined;
            default_popup?: string | undefined;
        }

        /** Source: https://developer.chrome.com/docs/extensions/reference/permissions-list */
        export type ManifestPermissions =
            | "accessibilityFeatures.modify"
            | "accessibilityFeatures.read"
            | "activeTab"
            | "alarms"
            | "audio"
            | "background"
            | "bookmarks"
            | "browsingData"
            | "certificateProvider"
            | "clipboardRead"
            | "clipboardWrite"
            | "contentSettings"
            | "contextMenus"
            | "cookies"
            | "debugger"
            | "declarativeContent"
            | "declarativeNetRequest"
            | "declarativeNetRequestFeedback"
            | "declarativeNetRequestWithHostAccess"
            | "declarativeWebRequest"
            | "desktopCapture"
            | "documentScan"
            | "downloads"
            | "downloads.open"
            | "downloads.shelf"
            | "downloads.ui"
            | "enterprise.deviceAttributes"
            | "enterprise.hardwarePlatform"
            | "enterprise.networkingAttributes"
            | "enterprise.platformKeys"
            | "experimental"
            | "favicon"
            | "fileBrowserHandler"
            | "fileSystemProvider"
            | "fontSettings"
            | "gcm"
            | "geolocation"
            | "history"
            | "identity"
            | "identity.email"
            | "idle"
            | "loginState"
            | "management"
            | "nativeMessaging"
            | "notifications"
            | "offscreen"
            | "pageCapture"
            | "platformKeys"
            | "power"
            | "printerProvider"
            | "printing"
            | "printingMetrics"
            | "privacy"
            | "processes"
            | "proxy"
            | "readingList"
            | "scripting"
            | "search"
            | "sessions"
            | "sidePanel"
            | "storage"
            | "system.cpu"
            | "system.display"
            | "system.memory"
            | "system.storage"
            | "systemLog"
            | "tabCapture"
            | "tabGroups"
            | "tabs"
            | "topSites"
            | "tts"
            | "ttsEngine"
            | "unlimitedStorage"
            | "userScripts"
            | "vpnProvider"
            | "wallpaper"
            | "webAuthenticationProxy"
            | "webNavigation"
            | "webRequest"
            | "webRequestBlocking"
            | "webRequestAuthProvider";

        /** Source : https://developer.chrome.com/docs/extensions/reference/api/permissions */
        export type ManifestOptionalPermissions = Exclude<
            ManifestPermissions,
            | "debugger"
            | "declarativeNetRequest"
            | "devtools"
            | "experimental"
            | "fontSettings"
            | "geolocation"
            | "proxy"
            | "tts"
            | "ttsEngine"
            | "unlimitedStorage"
            | "wallpaper"
            | "webAuthenticationProxy"
        >;

        export interface SearchProvider {
            name?: string | undefined;
            keyword?: string | undefined;
            favicon_url?: string | undefined;
            search_url: string;
            encoding?: string | undefined;
            suggest_url?: string | undefined;
            instant_url?: string | undefined;
            image_url?: string | undefined;
            search_url_post_params?: string | undefined;
            suggest_url_post_params?: string | undefined;
            instant_url_post_params?: string | undefined;
            image_url_post_params?: string | undefined;
            alternate_urls?: string[] | undefined;
            prepopulated_id?: number | undefined;
            is_default?: boolean | undefined;
        }

        export interface ManifestBase {
            // Required
            manifest_version: number;
            name: string;
            version: string;

            // Recommended
            default_locale?: string | undefined;
            description?: string | undefined;
            icons?: ManifestIcons | undefined;

            // Optional
            author?: {
                email: string;
            } | undefined;
            background_page?: string | undefined;
            chrome_settings_overrides?: {
                homepage?: string | undefined;
                search_provider?: SearchProvider | undefined;
                startup_pages?: string[] | undefined;
            } | undefined;
            chrome_ui_overrides?: {
                bookmarks_ui?: {
                    remove_bookmark_shortcut?: boolean | undefined;
                    remove_button?: boolean | undefined;
                } | undefined;
            } | undefined;
            chrome_url_overrides?: {
                bookmarks?: string | undefined;
                history?: string | undefined;
                newtab?: string | undefined;
            } | undefined;
            commands?: {
                [name: string]: {
                    suggested_key?: {
                        default?: string | undefined;
                        windows?: string | undefined;
                        mac?: string | undefined;
                        chromeos?: string | undefined;
                        linux?: string | undefined;
                    } | undefined;
                    description?: string | undefined;
                    global?: boolean | undefined;
                };
            } | undefined;
            content_capabilities?: {
                matches?: string[] | undefined;
                permissions?: string[] | undefined;
            } | undefined;
            content_scripts?:
                | Array<{
                    matches?: string[] | undefined;
                    exclude_matches?: string[] | undefined;
                    css?: string[] | undefined;
                    js?: string[] | undefined;
                    run_at?: string | undefined;
                    all_frames?: boolean | undefined;
                    match_about_blank?: boolean | undefined;
                    include_globs?: string[] | undefined;
                    exclude_globs?: string[] | undefined;
                }>
                | undefined;
            converted_from_user_script?: boolean | undefined;
            current_locale?: string | undefined;
            devtools_page?: string | undefined;
            event_rules?:
                | Array<{
                    event?: string | undefined;
                    actions?:
                        | Array<{
                            type: string;
                        }>
                        | undefined;
                    conditions?: chrome.declarativeContent.PageStateMatcherProperties[] | undefined;
                }>
                | undefined;
            externally_connectable?: {
                ids?: string[] | undefined;
                matches?: string[] | undefined;
                accepts_tls_channel_id?: boolean | undefined;
            } | undefined;
            file_browser_handlers?:
                | Array<{
                    id?: string | undefined;
                    default_title?: string | undefined;
                    file_filters?: string[] | undefined;
                }>
                | undefined;
            file_system_provider_capabilities?: {
                configurable?: boolean | undefined;
                watchable?: boolean | undefined;
                multiple_mounts?: boolean | undefined;
                source?: string | undefined;
            } | undefined;
            homepage_url?: string | undefined;
            import?:
                | Array<{
                    id: string;
                    minimum_version?: string | undefined;
                }>
                | undefined;
            export?: {
                whitelist?: string[] | undefined;
            } | undefined;
            incognito?: string | undefined;
            input_components?:
                | Array<{
                    name?: string | undefined;
                    type?: string | undefined;
                    id?: string | undefined;
                    description?: string | undefined;
                    language?: string[] | string | undefined;
                    layouts?: string[] | undefined;
                    indicator?: string | undefined;
                }>
                | undefined;
            key?: string | undefined;
            minimum_chrome_version?: string | undefined;
            nacl_modules?:
                | Array<{
                    path: string;
                    mime_type: string;
                }>
                | undefined;
            oauth2?: {
                client_id: string;
                scopes?: string[] | undefined;
            } | undefined;
            offline_enabled?: boolean | undefined;
            omnibox?: {
                keyword: string;
            } | undefined;
            options_page?: string | undefined;
            options_ui?: {
                page?: string | undefined;
                chrome_style?: boolean | undefined;
                open_in_tab?: boolean | undefined;
            } | undefined;
            platforms?:
                | Array<{
                    nacl_arch?: string | undefined;
                    sub_package_path: string;
                }>
                | undefined;
            plugins?:
                | Array<{
                    path: string;
                }>
                | undefined;
            requirements?: {
                "3D"?: {
                    features?: string[] | undefined;
                } | undefined;
                plugins?: {
                    npapi?: boolean | undefined;
                } | undefined;
            } | undefined;
            sandbox?: {
                pages: string[];
                content_security_policy?: string | undefined;
            } | undefined;
            short_name?: string | undefined;
            spellcheck?: {
                dictionary_language?: string | undefined;
                dictionary_locale?: string | undefined;
                dictionary_format?: string | undefined;
                dictionary_path?: string | undefined;
            } | undefined;
            storage?: {
                managed_schema: string;
            } | undefined;
            tts_engine?: {
                voices: Array<{
                    voice_name: string;
                    lang?: string | undefined;
                    gender?: string | undefined;
                    event_types?: string[] | undefined;
                }>;
            } | undefined;
            update_url?: string | undefined;
            version_name?: string | undefined;
            [key: string]: any;
        }

        export interface ManifestV2 extends ManifestBase {
            // Required
            manifest_version: 2;

            // Pick one (or none)
            browser_action?: ManifestAction | undefined;
            page_action?: ManifestAction | undefined;

            // Optional
            background?:
                | {
                    scripts?: string[] | undefined;
                    page?: string | undefined;
                    persistent?: boolean | undefined;
                }
                | undefined;
            content_security_policy?: string | undefined;
            optional_permissions?: ManifestOptionalPermissions[] | string[] | undefined;
            permissions?: ManifestPermissions[] | string[] | undefined;
            web_accessible_resources?: string[] | undefined;
        }

        export interface ManifestV3 extends ManifestBase {
            // Required
            manifest_version: 3;

            // Optional
            action?: ManifestAction | undefined;
            background?:
                | {
                    service_worker: string;
                    type?: "module"; // If the service worker uses ES modules
                }
                | undefined;
            content_scripts?:
                | Array<{
                    matches?: string[] | undefined;
                    exclude_matches?: string[] | undefined;
                    css?: string[] | undefined;
                    js?: string[] | undefined;
                    run_at?: string | undefined;
                    all_frames?: boolean | undefined;
                    match_about_blank?: boolean | undefined;
                    include_globs?: string[] | undefined;
                    exclude_globs?: string[] | undefined;
                    world?: "ISOLATED" | "MAIN" | undefined;
                }>
                | undefined;
            content_security_policy?: {
                extension_pages?: string;
                sandbox?: string;
            };
            host_permissions?: string[] | undefined;
            optional_permissions?: ManifestOptionalPermissions[] | undefined;
            optional_host_permissions?: string[] | undefined;
            permissions?: ManifestPermissions[] | undefined;
            web_accessible_resources?: Array<{ resources: string[]; matches: string[] }> | undefined;
        }

        export type Manifest = ManifestV2 | ManifestV3;

        /**
         * Attempts to connect listeners within an extension (such as the background page), or other extensions/apps. This is useful for content scripts connecting to their extension processes, inter-app/extension communication, and web messaging. Note that this does not connect to any listeners in a content script. Extensions may connect to content scripts embedded in tabs via {@link tabs.connect}.
         *
         * @param extensionId The ID of the extension to connect to. If omitted, a connection will be attempted with your own extension. Required if sending messages from a web page for web messaging.
         * @returns Port through which messages can be sent and received. The port's {@link Port onDisconnect} event is fired if the extension does not exist.
         */
        export function connect(connectInfo?: ConnectInfo): Port;
        export function connect(extensionId: string | undefined, connectInfo?: ConnectInfo): Port;

        /**
         * Connects to a native application in the host machine. This method requires the `"nativeMessaging"` permission. See Native Messaging for more information.
         * @param application The name of the registered application to connect to.
         */
        export function connectNative(application: string): Port;
        /**
         * Retrieves the JavaScript 'window' object for the background page running inside the current extension/app. If the background page is an event page, the system will ensure it is loaded before calling the callback. If there is no background page, an error is set.
         *
         * Foreground only
         *
         * Can return its result via Promise since Chrome 99.
         * @deprecated since Chrome 133. Background pages do not exist in MV3 extensions.
         */
        export function getBackgroundPage(): Promise<Window | undefined>;
        export function getBackgroundPage(callback: (backgroundPage?: Window) => void): void;

        /**
         * Fetches information about active contexts associated with this extension
         * @param filter A filter to find matching contexts. A context matches if it matches all specified fields in the filter. Any unspecified field in the filter matches all contexts.
         * @since Chrome 116 MV3.
         */
        export function getContexts(filter: ContextFilter): Promise<ExtensionContext[]>;
        export function getContexts(filter: ContextFilter, callback: (contexts: ExtensionContext[]) => void): void;

        /**
         * Returns details about the app or extension from the manifest. The object returned is a serialization of the full manifest file.
         * @return The manifest details.
         */
        export function getManifest(): Manifest;

        /**
         * Returns a DirectoryEntry for the package directory.
         *
         * Foreground only
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 122.
         */
        export function getPackageDirectoryEntry(): Promise<DirectoryEntry>;
        export function getPackageDirectoryEntry(callback: (directoryEntry: DirectoryEntry) => void): void;

        /**
         * Returns information about the current platform.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         */
        export function getPlatformInfo(): Promise<PlatformInfo>;
        export function getPlatformInfo(callback: (platformInfo: PlatformInfo) => void): void;

        /**
         * Converts a relative path within an app/extension install directory to a fully-qualified URL.
         * @param path A path to a resource within an app/extension expressed relative to its install directory.
         * @returns The fully-qualified URL to the resource.
         */
        export function getURL(path: string): string;

        /** Reloads the app or extension. This method is not supported in kiosk mode. For kiosk mode, use {@link chrome.runtime.restart()} method. */
        export function reload(): void;

        /**
         * Requests an immediate update check be done for this app/extension.
         *
         * **Important**: Most extensions/apps should **not** use this method, since Chrome already does automatic checks every few hours, and you can listen for the {@link runtime.onUpdateAvailable} event without needing to call requestUpdateCheck.
         *
         * This method is only appropriate to call in very limited circumstances, such as if your extension talks to a backend service, and the backend service has determined that the client extension version is very far out of date and you'd like to prompt a user to update. Most other uses of requestUpdateCheck, such as calling it unconditionally based on a repeating timer, probably only serve to waste client, network, and server resources.
         *
         * Note: When called with a callback, instead of returning an object this function will return the two properties as separate arguments passed to the callback.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 109.
         */
        export function requestUpdateCheck(): Promise<RequestUpdateCheckResult>;
        export function requestUpdateCheck(
            callback: (status: `${RequestUpdateCheckStatus}`, details?: UpdateCheckDetails) => void,
        ): void;

        /** Restart the ChromeOS device when the app runs in kiosk mode. Otherwise, it's no-op. */
        export function restart(): void;

        /**
         * Restart the ChromeOS device when the app runs in kiosk mode after the given seconds. If called again before the time ends, the reboot will be delayed. If called with a value of `-1`, the reboot will be cancelled. It's a no-op in non-kiosk mode. It's only allowed to be called repeatedly by the first extension to invoke this API.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         * @since Chrome 53
         */
        export function restartAfterDelay(seconds: number): Promise<void>;
        export function restartAfterDelay(seconds: number, callback: () => void): void;

        /**
         * Sends a single message to event listeners within your extension or a different extension/app. Similar to {@link runtime.connect} but only sends a single message, with an optional response. If sending to your extension, the {@link runtime.onMessage} event will be fired in every frame of your extension (except for the sender's frame), or {@link runtime.onMessageExternal}, if a different extension. Note that extensions cannot send messages to content scripts using this method. To send messages to content scripts, use {@link tabs.sendMessage}.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         * @param extensionId The ID of the extension to send the message to. If omitted, the message will be sent to your own extension/app. Required if sending messages from a web page for web messaging.
         * @param message The message to send. This message should be a JSON-ifiable object.
         */
        export function sendMessage<M = any, R = any>(message: M, options?: MessageOptions): Promise<R>;
        export function sendMessage<M = any, R = any>(message: M, callback: (response: R) => void): void;
        export function sendMessage<M = any, R = any>(
            message: M,
            options: MessageOptions | undefined,
            callback: (response: R) => void,
        ): void;
        export function sendMessage<M = any, R = any>(
            extensionId: string | undefined | null,
            message: M,
            options?: MessageOptions,
        ): Promise<R>;
        export function sendMessage<M = any, R = any>(
            extensionId: string | undefined | null,
            message: M,
            callback: (response: R) => void,
        ): void;
        export function sendMessage<M = any, R = any>(
            extensionId: string | undefined | null,
            message: M,
            options: MessageOptions | undefined,
            callback: (response: R) => void,
        ): void;

        /**
         * Send a single message to a native application. This method requires the `"nativeMessaging"` permission
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         * @param application The name of the native messaging host.
         * @param message The message that will be passed to the native messaging host.
         */
        export function sendNativeMessage(application: string, message: object): Promise<any>;
        export function sendNativeMessage(
            application: string,
            message: object,
            callback: (response: any) => void,
        ): void;

        /**
         * Sets the URL to be visited upon uninstallation. This may be used to clean up server-side data, do analytics, and implement surveys. Maximum 1023 characters.
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99.
         * @param url URL to be opened after the extension is uninstalled. This URL must have an http: or https: scheme. Set an empty string to not open a new tab upon uninstallation.
         */
        export function setUninstallURL(url: string): Promise<void>;
        export function setUninstallURL(url: string, callback: () => void): void;

        /**
         * Open your Extension's options page, if possible.
         *
         * The precise behavior may depend on your manifest's options_ui or options_page key, or what Chrome happens to support at the time. For example, the page may be opened in a new tab, within chrome://extensions, within an App, or it may just focus an open options page. It will never cause the caller page to reload.
         *
         * If your Extension does not declare an options page, or Chrome failed to create one for some other reason, the callback will set {@link runtime.lastError lastError} .
         *
         * Can return its result via Promise in Manifest V3 or later since Chrome 99
         */
        export function openOptionsPage(): Promise<void>;
        export function openOptionsPage(callback: () => void): void;

        /** Fired when a connection is made from either an extension process or a content script (by {@link runtime.connect}). */
        export const onConnect: events.Event<(port: Port) => void>;

        /** Fired when a connection is made from another extension (by {@link runtime.connect}), or from an externally connectable web site. */
        export const onConnectExternal: events.Event<(port: Port) => void>;

        /**
         * Fired when a connection is made from a native application. This event requires the `"nativeMessaging"` permission. It is only supported on Chrome OS.
         * @since Chrome 76
         */
        export const onConnectNative: events.Event<(port: Port) => void>;

        /** Sent to the event page just before it is unloaded. This gives the extension opportunity to do some clean up. Note that since the page is unloading, any asynchronous operations started while handling this event are not guaranteed to complete. If more activity for the event page occurs before it gets unloaded the onSuspendCanceled event will be sent and the page won't be unloaded. */
        export const onSuspend: events.Event<() => void>;

        /** Fired when a profile that has this extension installed first starts up. This event is not fired when an incognito profile is started, even if this extension is operating in 'split' incognito mode. */
        export const onStartup: events.Event<() => void>;

        /** Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version. */
        export const onInstalled: events.Event<(details: InstalledDetails) => void>;

        /** Sent after onSuspend to indicate that the app won't be unloaded after all. */
        export const onSuspendCanceled: events.Event<() => void>;

        /** Fired when a message is sent from either an extension process (by {@link runtime.sendMessage}) or a content script (by {@link tabs.sendMessage}). */
        export const onMessage: events.Event<
            (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void
        >;

        /** Fired when a message is sent from another extension (by {@link runtime.sendMessage}). Cannot be used in a content script. */
        export const onMessageExternal: events.Event<
            (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void
        >;

        /** Fired when an app or the device that it runs on needs to be restarted. The app should close all its windows at its earliest convenient time to let the restart to happen. If the app does nothing, a restart will be enforced after a 24-hour grace period has passed. Currently, this event is only fired for Chrome OS kiosk apps. */
        export const onRestartRequired: events.Event<(reason: `${OnRestartRequiredReason}`) => void>;

        /** Fired when an update is available, but isn't installed immediately because the app is currently running. If you do nothing, the update will be installed the next time the background page gets unloaded, if you want it to be installed sooner you can explicitly call chrome.runtime.reload(). If your extension is using a persistent background page, the background page of course never gets unloaded, so unless you call chrome.runtime.reload() manually in response to this event the update will not get installed until the next time Chrome itself restarts. If no handlers are listening for this event, and your extension has a persistent background page, it behaves as if chrome.runtime.reload() is called in response to this event. */
        export const onUpdateAvailable: events.Event<(details: UpdateAvailableDetails) => void>;

        /**
         * Fired when a Chrome update is available, but isn't installed immediately because a browser restart is required.
         * @deprecated Please use {@link runtime.onRestartRequired}.
         */
        export const onBrowserUpdateAvailable: events.Event<() => void>;

        /**
         * Fired when a connection is made from a user script from this extension.
         * @since chrome 115 MV3
         */
        export const onUserScriptConnect: events.Event<(port: Port) => void>;

        /**
         * Fired when a message is sent from a user script associated with the same extension.
         * @since chrome 115, MV3
         */
        export const onUserScriptMessage: events.Event<
            (message: any, sender: MessageSender, sendResponse: (response?: any) => void) => void
        >;
    }
} // end of chrome namespace
