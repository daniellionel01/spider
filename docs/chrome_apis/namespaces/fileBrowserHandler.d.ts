// Chrome API namespace: fileBrowserHandler
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace fileBrowserHandler {
        export interface SelectionParams {
            /**
             * Optional.
             * List of file extensions that the selected file can have. The list is also used to specify what files to be shown in the select file dialog. Files with the listed extensions are only shown in the dialog. Extensions should not include the leading '.'. Example: ['jpg', 'png']
             * @since Chrome 23
             */
            allowedFileExtensions?: string[] | undefined;
            /** Suggested name for the file. */
            suggestedName: string;
        }

        export interface SelectionResult {
            /** Optional. Selected file entry. It will be null if a file hasn't been selected.  */
            entry?: object | null | undefined;
            /** Whether the file has been selected. */
            success: boolean;
        }

        /** Event details payload for fileBrowserHandler.onExecute event. */
        export interface FileHandlerExecuteEventDetails {
            /** Optional. The ID of the tab that raised this event. Tab IDs are unique within a browser session.  */
            tab_id?: number | undefined;
            /** Array of Entry instances representing files that are targets of this action (selected in ChromeOS file browser). */
            entries: any[];
        }

        export interface FileBrowserHandlerExecuteEvent
            extends chrome.events.Event<(id: string, details: FileHandlerExecuteEventDetails) => void>
        {}

        /**
         * Prompts user to select file path under which file should be saved. When the file is selected, file access permission required to use the file (read, write and create) are granted to the caller. The file will not actually get created during the function call, so function caller must ensure its existence before using it. The function has to be invoked with a user gesture.
         * @since Chrome 21
         * @param selectionParams Parameters that will be used while selecting the file.
         * @param callback Function called upon completion.
         * Parameter result: Result of the method.
         */
        export function selectFile(selectionParams: SelectionParams, callback: (result: SelectionResult) => void): void;

        /** Fired when file system action is executed from ChromeOS file browser. */
        export var onExecute: FileBrowserHandlerExecuteEvent;
    }
} // end of chrome namespace
