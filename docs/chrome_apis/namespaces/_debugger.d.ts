// Chrome API namespace: _debugger
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace _debugger {
        /** Debuggee identifier. Either tabId, extensionId or targetId must be specified */
        export interface Debuggee {
            /** The id of the tab which you intend to debug. */
            tabId?: number;
            /** The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used. */
            extensionId?: string;
            /** The opaque id of the debug target. */
            targetId?: string;
        }

        /**
         * Debugger session identifier. One of tabId, extensionId or targetId must be specified. Additionally, an optional sessionId can be provided. If sessionId is specified for arguments sent from {@link onEvent}, it means the event is coming from a child protocol session within the root debuggee session. If sessionId is specified when passed to {@link sendCommand}, it targets a child protocol session within the root debuggee session.
         * @since Chrome 125
         */
        export interface DebuggerSession {
            /** The id of the extension which you intend to debug. Attaching to an extension background page is only possible when the `--silent-debugger-extension-api` command-line switch is used.*/
            extensionId?: string;
            /** The opaque id of the Chrome DevTools Protocol session. Identifies a child session within the root session identified by tabId, extensionId or targetId. */
            sessionId?: string;
            /** The id of the tab which you intend to debug. */
            tabId?: number;
            /** The opaque id of the debug target. */
            targetId?: string;
        }

        /**
         * Connection termination reason.
         * @since Chrome 44
         */
        export enum DetachReason {
            CANCELED_BY_USER = "canceled_by_user",
            TARGET_CLOSED = "target_closed",
        }

        /** Debug target information */
        export interface TargetInfo {
            /** Target type. */
            type: `${TargetInfoType}`;
            /** Target id. */
            id: string;
            /** The tab id, defined if type == 'page'. */
            tabId?: number;
            /** The extension id, defined if type = 'background_page'. */
            extensionId?: string;
            /** True if debugger is already attached. */
            attached: boolean;
            /** Target page title. */
            title: string;
            /** Target URL. */
            url: string;
            /** Target favicon URL.  */
            faviconUrl?: string;
        }

        /**
         * Target type.
         * @since Chrome 44
         */
        export enum TargetInfoType {
            BACKGROUND_PAGE = "background_page",
            OTHER = "other",
            PAGE = "page",
            WORKER = "worker",
        }

        /**
         * Attaches debugger to the given target.
         * @param target Debugging target to which you want to attach.
         * @param requiredVersion Required debugging protocol version ("0.1"). One can only attach to the debuggee with matching major version and greater or equal minor version. List of the protocol versions can be obtained in the documentation pages.
         *
         * Can return its result via Promise since Chrome 96.
         */
        export function attach(target: Debuggee, requiredVersion: string): Promise<void>;
        export function attach(target: Debuggee, requiredVersion: string, callback: () => void): void;

        /**
         * Detaches debugger from the given target.
         * @param target Debugging target from which you want to detach.
         *
         * Can return its result via Promise since Chrome 96.
         */
        export function detach(target: Debuggee): Promise<void>;
        export function detach(target: Debuggee, callback: () => void): void;

        /**
         * Sends given command to the debugging target.
         * @param target Debugging target to which you want to send the command.
         * @param method Method name. Should be one of the methods defined by the remote debugging protocol.
         * @param commandParams JSON object with request parameters. This object must conform to the remote debugging params scheme for given method.
         *
         * Can return its result via Promise since Chrome 96.
         */
        export function sendCommand(
            target: DebuggerSession,
            method: string,
            commandParams?: { [key: string]: unknown },
        ): Promise<object | undefined>;
        export function sendCommand(
            target: DebuggerSession,
            method: string,
            commandParams?: { [key: string]: unknown },
            callback?: (result?: object) => void,
        ): void;

        /**
         * Returns the list of available debug targets.
         *
         * Can return its result via Promise since Chrome 96.
         */
        export function getTargets(): Promise<TargetInfo[]>;
        export function getTargets(callback: (result: TargetInfo[]) => void): void;

        /** Fired when browser terminates debugging session for the tab. This happens when either the tab is being closed or Chrome DevTools is being invoked for the attached tab. */
        export const onDetach: chrome.events.Event<(source: Debuggee, reason: `${DetachReason}`) => void>;
        /** Fired whenever debugging target issues instrumentation event. */
        export const onEvent: chrome.events.Event<(source: DebuggerSession, method: string, params?: object) => void>;
    }
} // end of chrome namespace
