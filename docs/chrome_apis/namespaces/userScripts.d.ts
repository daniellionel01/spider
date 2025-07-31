// Chrome API namespace: userScripts
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace userScripts {
        /**
         * Execution environment for a user script.
         */
        export type ExecutionWorld = "MAIN" | "USER_SCRIPT";

        /** @since Chrome 135 */
        export interface InjectionResult {
            /** The document associated with the injection. */
            documentId: string;
            /** The error, if any. `error` and `result` are mutually exclusive. */
            error?: string;
            /** The frame associated with the injection. */
            frameId: number;
            /** The result of the script execution. */
            result: any;
        }

        export interface WorldProperties {
            /** Specifies the world csp. The default is the `ISOLATED` world csp. */
            csp?: string;
            /** Specifies whether messaging APIs are exposed. The default is false.*/
            messaging?: boolean;
            /**
             * Specifies the ID of the specific user script world to update. If not provided, updates the properties of the default user script world. Values with leading underscores (`_`) are reserved.
             * @since Chrome 133
             */
            worldId?: string;
        }

        export interface UserScriptFilter {
            ids?: string[];
        }

        /** @since Chrome 135 */
        export interface InjectionTarget {
            /** Whether the script should inject into all frames within the tab. Defaults to false. This must not be true if `frameIds` is specified. */
            allFrames?: boolean;
            /** The IDs of specific documentIds to inject into. This must not be set if `frameIds` is set. */
            documentIds?: string[];
            /** The IDs of specific frames to inject into. */
            frameIds?: number[];
            /** The ID of the tab into which to inject. */
            tabId: number;
        }

        export interface RegisteredUserScript {
            /** If true, it will inject into all frames, even if the frame is not the top-most frame in the tab. Each frame is checked independently for URL requirements; it will not inject into child frames if the URL requirements are not met. Defaults to false, meaning that only the top frame is matched. */
            allFrames?: boolean;
            /** Specifies wildcard patterns for pages this user script will NOT be injected into. */
            excludeGlobs?: string[];
            /**Excludes pages that this user script would otherwise be injected into. See Match Patterns for more details on the syntax of these strings. */
            excludeMatches?: string[];
            /** The ID of the user script specified in the API call. This property must not start with a '_' as it's reserved as a prefix for generated script IDs. */
            id: string;
            /** Specifies wildcard patterns for pages this user script will be injected into. */
            includeGlobs?: string[];
            /** The list of ScriptSource objects defining sources of scripts to be injected into matching pages. This property must be specified for {@link register}, and when specified it must be a non-empty array.*/
            js: ScriptSource[];
            /** Specifies which pages this user script will be injected into. See Match Patterns for more details on the syntax of these strings. This property must be specified for ${ref:register}. */
            matches?: string[];
            /** Specifies when JavaScript files are injected into the web page. The preferred and default value is document_idle */
            runAt?: extensionTypes.RunAt;
            /** The JavaScript execution environment to run the script in. The default is `USER_SCRIPT` */
            world?: ExecutionWorld;
            /**
             * Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved.
             * @since Chrome 133
             */
            worldId?: string;
        }

        /** @since Chrome 135 */
        export interface UserScriptInjection {
            /** Whether the injection should be triggered in the target as soon as possible. Note that this is not a guarantee that injection will occur prior to page load, as the page may have already loaded by the time the script reaches the target. */
            injectImmediately?: boolean;
            /** The list of ScriptSource objects defining sources of scripts to be injected into the target. */
            js: ScriptSource[];
            /** Details specifying the target into which to inject the script. */
            target: InjectionTarget;
            /** The JavaScript "world" to run the script in. The default is `USER_SCRIPT`. */
            world?: ExecutionWorld;
            /** Specifies the user script world ID to execute in. If omitted, the script will execute in the default user script world. Only valid if `world` is omitted or is `USER_SCRIPT`. Values with leading underscores (`_`) are reserved. */
            worldId?: string;
        }

        /**
         * Properties for a script source.
         */
        export interface ScriptSource {
            /** A string containing the JavaScript code to inject. Exactly one of file or code must be specified. */
            code?: string;
            /** The path of the JavaScript file to inject relative to the extension's root directory. Exactly one of file or code must be specified. */
            file?: string;
        }

        /**
         * Configures the `USER_SCRIPT` execution environment.
         *
         * @param properties - Contains the user script world configuration.
         * @returns A Promise that resolves with the same type that is passed to the callback.
         */
        export function configureWorld(properties: WorldProperties): Promise<void>;
        /**
         * Configures the `USER_SCRIPT` execution environment.
         *
         * @param properties - Contains the user script world configuration.
         * @param callback - Callback function to be executed after configuring the world.
         */
        export function configureWorld(properties: WorldProperties, callback: () => void): void;

        /**
         * Returns all dynamically-registered user scripts for this extension.
         *
         * @param filter - If specified, this method returns only the user scripts that match it.
         * @returns A Promise that resolves with the same type that is passed to the callback.
         */
        export function getScripts(filter?: UserScriptFilter): Promise<RegisteredUserScript[]>;
        /**
         * Returns all dynamically-registered user scripts for this extension.
         *
         * @param filter - If specified, this method returns only the user scripts that match it.
         * @param callback - Callback function to be executed after getting user scripts.
         */
        export function getScripts(filter: UserScriptFilter, callback: (scripts: RegisteredUserScript[]) => void): void;

        /**
         * Retrieves all registered world configurations.
         * @since Chrome 133
         */
        export function getWorldConfigurations(): Promise<WorldProperties[]>;
        export function getWorldConfigurations(callback: (worlds: WorldProperties[]) => void): void;

        /**
         * Injects a script into a target context. By default, the script will be run at `document_idle`, or immediately if the page has already loaded. If the `injectImmediately` property is set, the script will inject without waiting, even if the page has not finished loading. If the script evaluates to a promise, the browser will wait for the promise to settle and return the resulting value.
         * @since Chrome 135
         */
        export function execute(injection: UserScriptInjection): Promise<InjectionResult[]>;
        export function execute(injection: UserScriptInjection, callback: (result: InjectionResult[]) => void): void;

        /**
         * Registers one or more user scripts for this extension.
         *
         * @param scripts - Contains a list of user scripts to be registered.
         * @returns A Promise that resolves with the same type that is passed to the callback.
         */
        export function register(scripts: RegisteredUserScript[]): Promise<void>;
        /**
         * Registers one or more user scripts for this extension.
         *
         * @param scripts - Contains a list of user scripts to be registered.
         * @param callback - Callback function to be executed after registering user scripts.
         */
        export function register(scripts: RegisteredUserScript[], callback: () => void): void;

        /**
         * Resets the configuration for a user script world. Any scripts that inject into the world with the specified ID will use the default world configuration.
         * @param worldId The ID of the user script world to reset. If omitted, resets the default world's configuration.
         */
        export function resetWorldConfiguration(worldId?: string): Promise<void>;
        export function resetWorldConfiguration(worldId: string, callback: () => void): void;
        export function resetWorldConfiguration(callback: () => void): void;

        /**
         * Unregisters all dynamically-registered user scripts for this extension.
         *
         * @param filter - If specified, this method unregisters only the user scripts that match it.
         * @returns A Promise that resolves with the same type that is passed to the callback.
         */
        export function unregister(filter?: UserScriptFilter): Promise<void>;
        /**
         * Unregisters all dynamically-registered user scripts for this extension.
         *
         * @param filter - If specified, this method unregisters only the user scripts that match it.
         * @param callback - Callback function to be executed after unregistering user scripts.
         */
        export function unregister(filter: UserScriptFilter, callback: () => void): void;

        /**
         * Updates one or more user scripts for this extension.
         *
         * @param scripts - Contains a list of user scripts to be updated. A property is only updated for the existing script
         *                  if it is specified in this object. If there are errors during script parsing/file validation, or if
         *                  the IDs specified do not correspond to a fully registered script, then no scripts are updated.
         * @returns A Promise that resolves with the same type that is passed to the callback.
         */
        export function update(scripts: RegisteredUserScript[]): Promise<void>;
        /**
         * Updates one or more user scripts for this extension.
         *
         * @param scripts - Contains a list of user scripts to be updated. A property is only updated for the existing script
         *                  if it is specified in this object. If there are errors during script parsing/file validation, or if
         *                  the IDs specified do not correspond to a fully registered script, then no scripts are updated.
         * @param callback - Callback function to be executed after updating user scripts.
         */
        export function update(scripts: RegisteredUserScript[], callback: () => void): void;
    }
} // end of chrome namespace
