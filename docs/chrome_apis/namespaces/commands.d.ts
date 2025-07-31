// Chrome API namespace: commands
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace commands {
        export interface Command {
            /** Optional. The name of the Extension Command  */
            name?: string | undefined;
            /** Optional. The Extension Command description  */
            description?: string | undefined;
            /** Optional. The shortcut active for this command, or blank if not active.  */
            shortcut?: string | undefined;
        }

        export interface CommandEvent extends chrome.events.Event<(command: string, tab: chrome.tabs.Tab) => void> {}

        /**
         * Returns all the registered extension commands for this extension and their shortcut (if active).
         * @return The `getAll` method provides its result via callback or returned as a `Promise` (MV3 only).
         */
        export function getAll(): Promise<Command[]>;
        /**
         * Returns all the registered extension commands for this extension and their shortcut (if active).
         * @param callback Called to return the registered commands.
         */
        export function getAll(callback: (commands: Command[]) => void): void;

        /** Fired when a registered command is activated using a keyboard shortcut. */
        export var onCommand: CommandEvent;
    }
} // end of chrome namespace
