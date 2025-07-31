// Chrome API namespace: instanceID
// Extracted from chrome.d.ts

declare namespace chrome {
export namespace instanceID {
        export interface TokenRefreshEvent extends chrome.events.Event<() => void> {}

        /**
         * Resets the app instance identifier and revokes all tokens associated with it.
         *
         * The `deleteID()` method doesn't return any value, but can be used with a callback or asynchronously,
         * with a Promise (MV3 only).
         */
        export function deleteID(): Promise<void>;
        export function deleteID(callback: () => void): void;

        interface DeleteTokenParams {
            /**
             * Identifies the entity that is authorized to access resources associated with this Instance ID.
             * It can be a project ID from Google developer console.
             */
            authorizedEntity: string;
            /**
             * Identifies authorized actions that the authorized entity can take.
             * In other words, the scope that is used to obtain the token.
             * E.g. for sending GCM messages, `GCM` scope should be used.
             */
            scope: string;
        }
        /**
         * Revoked a granted token.
         *
         * The `deleteToken()` method doesn't return any value, but can be used with a callback or
         * asynchronously, with a Promise (MV3 only).
         */
        export function deleteToken(deleteTokenParams: DeleteTokenParams): Promise<void>;
        export function deleteToken(
            deleteTokenParams: DeleteTokenParams,
            callback: () => void,
        ): void;

        /**
         * Retrieves the time when the InstanceID has been generated.
         *
         * @return The time when the Instance ID has been generated, represented in milliseconds since the epoch.
         * It can return via a callback or asynchronously, with a Promise (MV3 only).
         */
        export function getCreationTime(): Promise<number>;
        export function getCreationTime(callback: (creationTime: number) => void): void;

        /**
         * Retrieves an identifier for the app instance.
         * The same ID will be returned as long as the application identity has not been revoked or expired.
         *
         * @return An Instance ID assigned to the app instance. Can be returned by a callback or a Promise (MV3 only).
         */
        export function getID(): Promise<string>;
        export function getID(callback: (instanceID: string) => void): void;

        interface GetTokenParams extends DeleteTokenParams {
            /**
             * Allows including a small number of string key/value pairs that will be associated with the token
             * and may be used in processing the request.
             *
             * @deprecated Since Chrome 89. `options` are deprecated and will be ignored.
             */
            options?: { [key: string]: string };
        }
        /**
         * Return a token that allows the authorized entity to access the service defined by scope.
         *
         * @return A token assigned by the requested service. Can be returned by a callback or a Promise (MV3 only).
         */
        export function getToken(getTokenParams: GetTokenParams): Promise<string>;
        export function getToken(getTokenParams: GetTokenParams, callback: (token: string) => void): void;

        export var onTokenRefresh: TokenRefreshEvent;
    }
} // end of chrome namespace
