// Chrome API namespace: readingList
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace readingList {
        export interface AddEntryOptions {
            /** Will be `true` if the entry has been read. */
            hasBeenRead: boolean;
            /** The title of the entry. */
            title: string;
            /** The url of the entry. */
            url: string;
        }

        export interface QueryInfo {
            /** Indicates whether to search for read (`true`) or unread (`false`) items. */
            hasBeenRead?: boolean | undefined;
            /** A title to search for. */
            title?: string | undefined;
            /** A url to search for. */
            url?: string | undefined;
        }

        export interface ReadingListEntry {
            /** The time the entry was created. Recorded in milliseconds since Jan 1, 1970. */
            creationTime: number;
            /** Will be `true` if the entry has been read. */
            hasBeenRead: boolean;
            /** The last time the entry was updated. This value is in milliseconds since Jan 1, 1970. */
            lastUpdateTime: number;
            /** The title of the entry. */
            title: string;
            /** The url of the entry. */
            url: string;
        }

        export interface RemoveOptions {
            /** The url to remove. */
            url: string;
        }

        export interface UpdateEntryOptions {
            /** The updated read status. The existing status remains if a value isn't provided. */
            hasBeenRead?: boolean | undefined;
            /** The new title. The existing tile remains if a value isn't provided. */
            title?: string | undefined;
            /** The url that will be updated. */
            url: string;
        }

        /**
         * Adds an entry to the reading list if it does not exist.
         * @since Chrome 120, MV3
         * @param entry The entry to add to the reading list.
         * @param callback
         */
        export function addEntry(entry: AddEntryOptions): Promise<void>;
        export function addEntry(entry: AddEntryOptions, callback: () => void): void;

        /**
         * Retrieves all entries that match the `QueryInfo` properties. Properties that are not provided will not be matched.
         * @since Chrome 120, MV3
         * @param info The properties to search for.
         * @param callback
         */
        export function query(info: QueryInfo): Promise<ReadingListEntry[]>;
        export function query(info: QueryInfo, callback: (entries: ReadingListEntry[]) => void): void;

        /**
         * Removes an entry from the reading list if it exists.
         * @since Chrome 120, MV3
         * @param info The entry to remove from the reading list.
         * @param callback
         */
        export function removeEntry(info: RemoveOptions): Promise<void>;
        export function removeEntry(info: RemoveOptions, callback: () => void): void;

        /**
         * Updates a reading list entry if it exists.
         * @since Chrome 120, MV3
         * @param info The entry to update.
         * @param callback
         */
        export function updateEntry(info: UpdateEntryOptions): Promise<void>;
        export function updateEntry(info: UpdateEntryOptions, callback: () => void): void;

        /**
         * Triggered when a ReadingListEntry is added to the reading list.
         * @since Chrome 120, MV3
         */
        export const onEntryAdded: chrome.events.Event<(entry: ReadingListEntry) => void>;

        /**
         * Triggered when a ReadingListEntry is removed from the reading list.
         * @since Chrome 120, MV3
         */
        export const onEntryRemoved: chrome.events.Event<(entry: ReadingListEntry) => void>;

        /**
         * Triggered when a ReadingListEntry is updated in the reading list.
         * @since Chrome 120, MV3
         */
        export const onEntryUpdated: chrome.events.Event<(entry: ReadingListEntry) => void>;
    }
} // end of chrome namespace
